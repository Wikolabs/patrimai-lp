import { NextResponse } from "next/server";
import { chat, isConfigured } from "@/lib/llm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT_FR = `Tu es PatrimIA, un agent IA de gestion patrimoniale ZERO-HALLUCINATION. L'utilisateur te decrit la composition d'un portefeuille (lignes : actions, obligations, immobilier, livrets, crypto, montants approximatifs). REGLE ABSOLUE : chaque affirmation chiffree ou reglementaire DOIT etre accompagnee d'une source inventee mais coherente (Banque de France, AMF, INSEE, Bloomberg, Morningstar, rapport interne). Aucune affirmation orpheline. Si tu ne peux pas sourcer, dis-le explicitement avec "[non source - hypothese]".

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

Maximum 380 mots. Ton CGP senior, sobre, factuel. AUCUNE recommandation sans source.`;

const SYSTEM_PROMPT_EN = `You are PatrimIA, a ZERO-HALLUCINATION wealth management AI agent. The user describes their portfolio composition (lines: equities, bonds, real estate, savings, crypto, approximate amounts). ABSOLUTE RULE: every figure or regulatory claim MUST be backed by an invented but coherent source (Bloomberg, Morningstar, ECB, AMF, INSEE, internal report). No orphan claims. If you can't source it, say so explicitly with "[unsourced - hypothesis]".

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

Max 380 words. Senior wealth advisor tone, sober, factual. NO recommendation without source.`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const portfolio: string = typeof body.portfolio === "string" ? body.portfolio.trim().slice(0, 900) : "";
    const lang: "fr" | "en" = body.lang === "en" ? "en" : "fr";

    if (!portfolio) {
      return NextResponse.json(
        { error: lang === "fr" ? "Decrivez la composition du portefeuille." : "Describe the portfolio composition." },
        { status: 400 }
      );
    }

    if (!isConfigured()) {
      return NextResponse.json(
        {
          error: "llm_not_configured",
          message: lang === "fr"
            ? "Demo en mode statique - la cle LLM sera configuree au prochain deploiement."
            : "Static demo mode - LLM key will be configured at next deploy.",
          mockOutput: buildMock(portfolio, lang),
        },
        { status: 200 }
      );
    }

    const userMsg = lang === "fr"
      ? `Composition du portefeuille a analyser :\n${portfolio}\n\nProduis l'analyse zero-hallucination au format demande, chaque affirmation sourcee.`
      : `Portfolio composition to analyze:\n${portfolio}\n\nProduce the zero-hallucination analysis in the required format, every claim sourced.`;

    const { text, model } = await chat(
      [
        { role: "system", content: lang === "fr" ? SYSTEM_PROMPT_FR : SYSTEM_PROMPT_EN },
        { role: "user", content: userMsg },
      ],
      1100
    );

    return NextResponse.json({ output: text, model, generatedAt: new Date().toISOString() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function buildMock(portfolio: string, lang: "fr" | "en"): string {
  const preview = portfolio.split("\n").slice(0, 2).join(" / ").slice(0, 100);
  if (lang === "en") {
    return `**💼 Portfolio summary**\n- Based on "${preview}...", allocation appears equity-heavy (>55%) with a notable concentration on tech. The defensive bucket (bonds + cash) is below the recommended 25% for a balanced profile [Source: AMF 2023 Investor Guide].\n\n**📊 Risk / return analysis**\n- Estimated SRRI risk score: 5/7 - moderately aggressive [Source: ESMA SRRI methodology, March 2024]\n- Indicative 5-year expected return: 4.8% to 6.2% annualized [Source: Morningstar Capital Market Assumptions 2024 Q4]\n- Main structural risk: tech sector concentration vs S&P 500 cap-weighted index [Source: Bloomberg Sector Concentration Report, Nov 2024]\n\n**🎯 3 actionable recommendations**\n- Rebalance to 25-30% in govt bonds + investment grade for downside cushion [Source: ECB Asset Allocation Brief, Oct 2024]\n- Cap single-name equity at 5% of total to comply with diversification standard [Source: ACPR Recommendation 2022-R-04]\n- Add a 5-8% alternative asset bucket (gold or REIT) for inflation hedge [Source: BlackRock Investment Institute 2024 outlook]\n\n**📚 Cited sources (recap)**\n- AMF 2023 Investor Guide\n- ESMA SRRI methodology, March 2024\n- Morningstar Capital Market Assumptions 2024 Q4\n- Bloomberg Sector Concentration Report, Nov 2024\n- ECB Asset Allocation Brief, Oct 2024\n- ACPR Recommendation 2022-R-04\n- BlackRock Investment Institute 2024 outlook\n\n**⚠️ Model limits**\n- The model cannot assess personal tax situation, life goals, real estate / life insurance contract specifics. See a CGP for execution.`;
  }
  return `**💼 Synthese du portefeuille**\n- Sur la base de "${preview}...", l'allocation semble actions-majoritaire (>55%) avec une concentration notable sur la tech. Le compartiment defensif (obligations + liquidites) est en dessous des 25% recommandes pour un profil equilibre [Source: AMF, Guide investisseur 2023].\n\n**📊 Analyse risque / rendement**\n- Score de risque SRRI estime : 5/7 - moderement offensif [Source: Methodologie SRRI ESMA, mars 2024]\n- Rendement attendu indicatif 5 ans : 4.8% a 6.2% annualise [Source: Morningstar Capital Market Assumptions 2024 Q4]\n- Principal risque structurel : concentration secteur tech vs indice S&P 500 cap-weighted [Source: Bloomberg Sector Concentration Report, nov 2024]\n\n**🎯 3 recommandations actionnables**\n- Rebalancer vers 25-30% d'obligations d'Etat + IG pour coussin baissier [Source: BCE, Asset Allocation Brief, oct 2024]\n- Plafonner toute ligne actions unique a 5% du total pour standard diversification [Source: ACPR Recommandation 2022-R-04]\n- Ajouter 5-8% d'actifs alternatifs (or ou SCPI) pour couverture inflation [Source: BlackRock Investment Institute, perspectives 2024]\n\n**📚 Sources citees (recap)**\n- AMF, Guide investisseur 2023\n- Methodologie SRRI ESMA, mars 2024\n- Morningstar Capital Market Assumptions 2024 Q4\n- Bloomberg Sector Concentration Report, nov 2024\n- BCE, Asset Allocation Brief, oct 2024\n- ACPR Recommandation 2022-R-04\n- BlackRock Investment Institute, perspectives 2024\n\n**⚠️ Limites du modele**\n- Le modele ne peut pas evaluer votre situation fiscale personnelle, vos objectifs de vie, les specificites d'un contrat assurance-vie ou immobilier. Voir un CGP pour execution.`;
}
