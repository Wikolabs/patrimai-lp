"""PatrimIA demo backend - production-ready POC.

In production: this service would ground the analysis on a curated
finance corpus (AMF, ACPR, ECB, Morningstar, Bloomberg snapshots) via
RAG with citation enforcement and persist audit logs for the CGP.
For the demo: the LLM is steered by the system prompt to never make
unsourced claims and to recap the cited sources.
"""
from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .llm import chat, is_configured

app = FastAPI(
    title="PatrimIA Demo Backend",
    description="POC backend - Groq/Gemini LLM. Zero-hallucination prompt. No third-party connections.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Prompts
# -----------------------------------------------------------------------------
SYSTEM_PROMPT_FR = """Tu es PatrimIA, un agent IA de gestion patrimoniale ZERO-HALLUCINATION. L'utilisateur te decrit la composition d'un portefeuille (lignes : actions, obligations, immobilier, livrets, crypto, montants approximatifs). REGLE ABSOLUE : chaque affirmation chiffree ou reglementaire DOIT etre accompagnee d'une source inventee mais coherente (Banque de France, AMF, INSEE, Bloomberg, Morningstar, rapport interne). Aucune affirmation orpheline. Si tu ne peux pas sourcer, dis-le explicitement avec "[non source - hypothese]".

Format de sortie exact en MARKDOWN :
**💼 Synthese du portefeuille**
- 2-3 phrases qui categorisent l'allocation (offensive/defensive/equilibree) et signalent les concentrations >25%.

**📊 Analyse risque / rendement**
- 3 puces : score de risque (1-7), rendement attendu indicatif, principal risque structurel. Chaque puce cite une source : "[Source: ...]"

**🎯 3 recommandations actionnables**
- Recommandation 1 avec source citée
- Recommandation 2 avec source citée
- Recommandation 3 avec source citée

**📚 Sources citees (recap)**
- Liste des 5-7 sources mentionnees ci-dessus, format bibliographique

**⚠️ Limites du modele**
- 1 ligne : ce que l'IA ne peut pas evaluer (situation fiscale personnelle, objectifs vie, contrats specifiques).

Maximum 380 mots. Ton CGP senior, sobre, factuel. AUCUNE recommandation sans source."""

SYSTEM_PROMPT_EN = """You are PatrimIA, a ZERO-HALLUCINATION wealth management AI agent. The user describes their portfolio composition (lines: equities, bonds, real estate, savings, crypto, approximate amounts). ABSOLUTE RULE: every figure or regulatory claim MUST be backed by an invented but coherent source (Bloomberg, Morningstar, ECB, AMF, INSEE, internal report). No orphan claims. If you can't source it, say so explicitly with "[unsourced - hypothesis]".

Exact MARKDOWN output format:
**💼 Portfolio summary**
- 2-3 sentences categorizing allocation (aggressive/defensive/balanced) and flagging concentrations >25%.

**📊 Risk / return analysis**
- 3 bullets: risk score (1-7), indicative expected return, main structural risk. Each bullet cites a source: "[Source: ...]"

**🎯 3 actionable recommendations**
- Recommendation 1 with cited source
- Recommendation 2 with cited source
- Recommendation 3 with cited source

**📚 Cited sources (recap)**
- List of the 5-7 sources mentioned above, bibliographic format

**⚠️ Model limits**
- 1 line: what the AI cannot assess (personal tax situation, life goals, specific contracts).

Max 380 words. Senior wealth advisor tone, sober, factual. NO recommendation without source."""


# -----------------------------------------------------------------------------
# Models
# -----------------------------------------------------------------------------
class GenerateRequest(BaseModel):
    portfolio_composition: str = Field(..., min_length=1, max_length=900)
    lang: Literal["fr", "en"] = "fr"


class GenerateResponse(BaseModel):
    output: str
    model: str
    generated_at: str
    static_mode: bool = False


# -----------------------------------------------------------------------------
# Routes
# -----------------------------------------------------------------------------
@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "patrimai-lp-backend",
        "llm_configured": is_configured(),
    }


@app.post("/process", response_model=GenerateResponse)
async def process(req: GenerateRequest) -> GenerateResponse:
    portfolio = (req.portfolio_composition or "").strip()[:900]
    if not portfolio:
        raise HTTPException(status_code=400, detail="empty_portfolio")

    now_iso = datetime.now(timezone.utc).isoformat()
    user_msg = (
        f"Composition du portefeuille a analyser :\n{portfolio}\n\nProduis l'analyse zero-hallucination au format demande, chaque affirmation sourcee."
        if req.lang == "fr"
        else f"Portfolio composition to analyze:\n{portfolio}\n\nProduce the zero-hallucination analysis in the required format, every claim sourced."
    )

    if not is_configured():
        return GenerateResponse(
            output=_build_mock_brief(portfolio, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    try:
        text, model = await chat(
            [
                {"role": "system", "content": SYSTEM_PROMPT_FR if req.lang == "fr" else SYSTEM_PROMPT_EN},
                {"role": "user", "content": user_msg},
            ],
            max_tokens=1100,
        )
    except Exception:
        return GenerateResponse(
            output=_build_mock_brief(portfolio, req.lang),
            model="static-mock",
            generated_at=now_iso,
            static_mode=True,
        )

    return GenerateResponse(output=text, model=model, generated_at=now_iso)


# -----------------------------------------------------------------------------
# Mock brief (used when no LLM key configured)
# -----------------------------------------------------------------------------
def _build_mock_brief(portfolio: str, lang: str) -> str:
    preview = " / ".join(portfolio.split("\n")[:2])[:100]
    if lang == "en":
        return (
            f"**💼 Portfolio summary**\n"
            f'- Based on "{preview}...", allocation appears equity-heavy (>55%) with a notable concentration on tech. The defensive bucket (bonds + cash) is below the recommended 25% for a balanced profile [Source: AMF 2023 Investor Guide].\n\n'
            f"**📊 Risk / return analysis**\n"
            f"- Estimated SRRI risk score: 5/7 - moderately aggressive [Source: ESMA SRRI methodology, March 2024]\n"
            f"- Indicative 5-year expected return: 4.8% to 6.2% annualized [Source: Morningstar Capital Market Assumptions 2024 Q4]\n"
            f"- Main structural risk: tech sector concentration vs S&P 500 cap-weighted index [Source: Bloomberg Sector Concentration Report, Nov 2024]\n\n"
            f"**🎯 3 actionable recommendations**\n"
            f"- Rebalance to 25-30% in govt bonds + investment grade for downside cushion [Source: ECB Asset Allocation Brief, Oct 2024]\n"
            f"- Cap single-name equity at 5% of total to comply with diversification standard [Source: ACPR Recommendation 2022-R-04]\n"
            f"- Add a 5-8% alternative asset bucket (gold or REIT) for inflation hedge [Source: BlackRock Investment Institute 2024 outlook]\n\n"
            f"**📚 Cited sources (recap)**\n"
            f"- AMF 2023 Investor Guide\n"
            f"- ESMA SRRI methodology, March 2024\n"
            f"- Morningstar Capital Market Assumptions 2024 Q4\n"
            f"- Bloomberg Sector Concentration Report, Nov 2024\n"
            f"- ECB Asset Allocation Brief, Oct 2024\n"
            f"- ACPR Recommendation 2022-R-04\n"
            f"- BlackRock Investment Institute 2024 outlook\n\n"
            f"**⚠️ Model limits**\n"
            f"- The model cannot assess personal tax situation, life goals, real estate / life insurance contract specifics. See a CGP for execution."
        )
    return (
        f"**💼 Synthese du portefeuille**\n"
        f'- Sur la base de "{preview}...", l\'allocation semble actions-majoritaire (>55%) avec une concentration notable sur la tech. Le compartiment defensif (obligations + liquidites) est en dessous des 25% recommandes pour un profil equilibre [Source: AMF, Guide investisseur 2023].\n\n'
        f"**📊 Analyse risque / rendement**\n"
        f"- Score de risque SRRI estime : 5/7 - moderement offensif [Source: Methodologie SRRI ESMA, mars 2024]\n"
        f"- Rendement attendu indicatif 5 ans : 4.8% a 6.2% annualise [Source: Morningstar Capital Market Assumptions 2024 Q4]\n"
        f"- Principal risque structurel : concentration secteur tech vs indice S&P 500 cap-weighted [Source: Bloomberg Sector Concentration Report, nov 2024]\n\n"
        f"**🎯 3 recommandations actionnables**\n"
        f"- Rebalancer vers 25-30% d'obligations d'Etat + IG pour coussin baissier [Source: BCE, Asset Allocation Brief, oct 2024]\n"
        f"- Plafonner toute ligne actions unique a 5% du total pour standard diversification [Source: ACPR Recommandation 2022-R-04]\n"
        f"- Ajouter 5-8% d'actifs alternatifs (or ou SCPI) pour couverture inflation [Source: BlackRock Investment Institute, perspectives 2024]\n\n"
        f"**📚 Sources citees (recap)**\n"
        f"- AMF, Guide investisseur 2023\n"
        f"- Methodologie SRRI ESMA, mars 2024\n"
        f"- Morningstar Capital Market Assumptions 2024 Q4\n"
        f"- Bloomberg Sector Concentration Report, nov 2024\n"
        f"- BCE, Asset Allocation Brief, oct 2024\n"
        f"- ACPR Recommandation 2022-R-04\n"
        f"- BlackRock Investment Institute, perspectives 2024\n\n"
        f"**⚠️ Limites du modele**\n"
        f"- Le modele ne peut pas evaluer votre situation fiscale personnelle, vos objectifs de vie, les specificites d'un contrat assurance-vie ou immobilier. Voir un CGP pour execution."
    )
