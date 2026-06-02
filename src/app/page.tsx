"use client";
import { useState } from "react";

const PRODUCT = "PatrimIA";

const PAL = {
  bg: "#0D0F14",
  bg2: "#15181F",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.09)",
  txt1: "#F5EFE0",
  txt2: "#B8AC8C",
  txt3: "#807660",
  accent: "#C9A84C",
  accentSoft: "rgba(201,168,76,0.12)",
  accentBorder: "rgba(201,168,76,0.30)",
  accentGlow: "rgba(201,168,76,0.18)",
  navBg: "rgba(13,15,20,0.82)",
};

const SAMPLE_FR = "Actions Tech (AAPL, MSFT, NVDA), 320 000 EUR\nETF World S&P 500, 180 000 EUR\nObligations Etat France, 90 000 EUR\nLivret A + LDDS, 45 000 EUR\nSCPI Pierval Sante, 60 000 EUR\nCrypto BTC + ETH, 35 000 EUR";
const SAMPLE_EN = "Tech equities (AAPL, MSFT, NVDA), 320 000 EUR\nMSCI World ETF, 180 000 EUR\nFrench govt bonds, 90 000 EUR\nLivret A + LDDS, 45 000 EUR\nHealthcare REIT, 60 000 EUR\nCrypto BTC + ETH, 35 000 EUR";

export default function DemoPage() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [portfolio, setPortfolio] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [staticMode, setStaticMode] = useState(false);

  const t = lang === "fr" ? {
    back: "Retour", title: "Demo", sub: PRODUCT + " - agent patrimonial zero-hallucination",
    desc: "Collez la composition de votre portefeuille (lignes : actions, obligations, immobilier, livrets, crypto). L'agent IA produit une analyse risque/rendement avec sources citees pour CHAQUE affirmation. Aucune execution reelle - POC qui montre la rigueur de production.",
    inputLabel: "Composition portefeuille",
    placeholderP: "Une ligne par poste (ex: Actions tech, 120 000 EUR)",
    sample: "Utiliser un exemple",
    generate: "Analyser le portefeuille", generating: "Analyse en cours...",
    outputTitle: "Analyse PatrimIA", emptyHint: "L'analyse s'affiche ici une fois generee.",
    contactCGP: "Briefer mon CGP", exportPDF: "Exporter en PDF", verifySources: "Verifier les sources",
    cgpMock: "Brief envoye a votre CGP (mode demo, pas de connexion CRM reelle)",
    pdfMock: "PDF reglementaire genere (mode demo, pas de telechargement reel)",
    sourcesMock: "Sources verifiees - lien vers AMF, BCE, Morningstar (mode demo)",
    fallback: "Mode statique : la cle LLM sera ajoutee au prochain deploiement.",
    poweredBy: "Modele :",
    note: "DEMO POC - aucune execution d'ordre, aucune connexion CRM/banque. ZERO-HALLUCINATION : chaque chiffre est sourcee. Sources demo inventees mais coherentes, en production = sources reelles (BCE, AMF, Bloomberg).",
  } : {
    back: "Back", title: "Demo", sub: PRODUCT + " - zero-hallucination wealth agent",
    desc: "Paste your portfolio composition (lines: equities, bonds, real estate, savings, crypto). The AI agent produces a risk/return analysis with cited sources for EVERY claim. No real execution - POC showing production rigor.",
    inputLabel: "Portfolio composition",
    placeholderP: "One line per position (e.g. Tech equities, 120 000 EUR)",
    sample: "Use a sample",
    generate: "Analyze portfolio", generating: "Analyzing...",
    outputTitle: "PatrimIA analysis", emptyHint: "The analysis will appear here once generated.",
    contactCGP: "Brief my advisor", exportPDF: "Export as PDF", verifySources: "Verify sources",
    cgpMock: "Brief sent to your wealth advisor (demo mode, no real CRM connection)",
    pdfMock: "Regulatory PDF generated (demo mode, no real download)",
    sourcesMock: "Sources verified - link to ECB, AMF, Morningstar (demo mode)",
    fallback: "Static mode: LLM key will be added at next deploy.",
    poweredBy: "Model:",
    note: "DEMO POC - no order execution, no CRM/bank connection. ZERO-HALLUCINATION: every figure is sourced. Demo sources are invented but coherent, in production = real sources (ECB, AMF, Bloomberg).",
  };

  async function generate() {
    setError(""); setOutput(""); setModel(""); setStaticMode(false);
    if (!portfolio.trim()) {
      setError(lang === "fr" ? "Decrivez votre portefeuille." : "Describe your portfolio.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/offers/patrimai/demo/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ portfolio, lang }),
      });
      const j = await r.json();
      if (j.error === "llm_not_configured") {
        setOutput(j.mockOutput || ""); setStaticMode(true);
      } else if (j.error) {
        setError(j.message || j.error);
      } else {
        setOutput(j.output || ""); setModel(j.model || "");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  function loadSample() {
    setPortfolio(lang === "fr" ? SAMPLE_FR : SAMPLE_EN);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }

  return (
    <div style={{ minHeight: "100vh", background: PAL.bg, color: PAL.txt1, display: "flex", flexDirection: "column" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        .wk-input { width: 100%; padding: 12px 14px; border-radius: 10px; background: ${PAL.surface}; border: 1px solid ${PAL.border}; color: ${PAL.txt1}; font-family: inherit; font-size: 14px; transition: border-color .2s, background .2s; }
        .wk-input:focus { outline: none; border-color: ${PAL.accent}; background: ${PAL.surfaceHover}; }
        .wk-btn-primary { background: ${PAL.accent}; color: #0D0F14; border: none; border-radius: 10px; padding: 13px 22px; font-weight: 700; font-size: 14px; cursor: pointer; font-family: inherit; transition: opacity .2s, transform .2s; display: inline-flex; align-items: center; gap: 8px; }
        .wk-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
        .wk-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
        .wk-btn-ghost { background: ${PAL.surface}; color: ${PAL.txt1}; border: 1px solid ${PAL.border}; border-radius: 10px; padding: 9px 14px; font-weight: 600; font-size: 13px; cursor: pointer; font-family: inherit; transition: background .2s, border-color .2s; display: inline-flex; align-items: center; gap: 6px; }
        .wk-btn-ghost:hover { background: ${PAL.surfaceHover}; border-color: ${PAL.accentBorder}; }
        .wk-md p, .wk-md ul { margin: 0 0 10px; }
        .wk-md ul { padding-left: 18px; }
        .wk-md li { margin-bottom: 4px; line-height: 1.65; }
        .wk-md strong { color: ${PAL.accent}; font-weight: 700; display: block; margin-top: 10px; margin-bottom: 4px; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; }
        @media (max-width: 768px) { .demo-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <nav style={{ padding: "16px 32px", borderBottom: `1px solid ${PAL.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: PAL.navBg, backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
        <a href="/" style={{ color: PAL.accent, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          {"<- "}{t.back} {PRODUCT}<span style={{ color: PAL.accent }}>.</span>
        </a>
        <div style={{ display: "inline-flex", border: `1px solid ${PAL.border}`, borderRadius: 100, padding: 2, background: PAL.surface }}>
          <button onClick={() => setLang("fr")} style={{ background: lang === "fr" ? PAL.accent : "transparent", color: lang === "fr" ? "#0D0F14" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>FR</button>
          <button onClick={() => setLang("en")} style={{ background: lang === "en" ? PAL.accent : "transparent", color: lang === "en" ? "#0D0F14" : PAL.txt2, border: "none", padding: "4px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 100, fontFamily: "inherit" }}>EN</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, margin: "0 0 6px" }}>
          {t.title} - <em style={{ fontStyle: "italic", color: PAL.accent }}>{PRODUCT}</em>
        </h1>
        <p style={{ color: PAL.txt2, fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 720, margin: "0 0 6px" }}>{t.sub}</p>
        <p style={{ color: PAL.txt3, fontSize: "0.78rem", lineHeight: 1.55, maxWidth: 720, margin: "0 0 28px" }}>{t.desc}</p>

        <div className="demo-grid" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 24 }}>
          <section style={{ background: PAL.surface, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22 }}>
            <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: "0 0 14px" }}>{t.inputLabel}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              <textarea className="wk-input" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder={t.placeholderP} rows={9} style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }} />
              <button className="wk-btn-ghost" onClick={loadSample} style={{ justifyContent: "center" }}>{t.sample}</button>
            </div>
            <button className="wk-btn-primary" disabled={loading} onClick={generate} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "* " + t.generating : "+ " + t.generate}
            </button>
            {error && <div style={{ marginTop: 12, color: "#F87171", fontSize: 13, padding: "8px 12px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8 }}>{error}</div>}
            <p style={{ color: PAL.txt3, fontSize: 11, lineHeight: 1.5, marginTop: 18, marginBottom: 0, paddingTop: 14, borderTop: `1px solid ${PAL.border}` }}>{t.note}</p>
          </section>

          <section style={{ background: PAL.bg2, border: `1px solid ${PAL.border}`, borderRadius: 16, padding: 22, minHeight: 420, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: "0.72rem", color: PAL.txt3, textTransform: "uppercase", letterSpacing: 2, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: output ? "#22C55E" : PAL.txt3 }} />
                {t.outputTitle}
              </h2>
              {model && <span style={{ fontSize: 10, color: PAL.txt3, fontFamily: "monospace" }}>{t.poweredBy} {model}</span>}
            </div>

            {!output ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: PAL.txt3, fontSize: 14, textAlign: "center", padding: 30 }}>
                {t.emptyHint}
              </div>
            ) : (
              <div className="wk-md" style={{ color: PAL.txt1, fontSize: 14, lineHeight: 1.7, flex: 1 }} dangerouslySetInnerHTML={{ __html: renderMarkdown(output) }} />
            )}

            {output && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${PAL.border}` }}>
                <button className="wk-btn-ghost" onClick={() => showToast(t.cgpMock)}>{t.contactCGP}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.pdfMock)}>{t.exportPDF}</button>
                <button className="wk-btn-ghost" onClick={() => showToast(t.sourcesMock)}>{t.verifySources}</button>
              </div>
            )}
            {staticMode && <div style={{ marginTop: 14, color: PAL.txt3, fontSize: 12, fontStyle: "italic" }}>{t.fallback}</div>}
          </section>
        </div>
      </main>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: PAL.surface, border: `1px solid ${PAL.accentBorder}`, borderRadius: 12, padding: "12px 20px", color: PAL.txt1, fontSize: 13, fontWeight: 600, zIndex: 50, backdropFilter: "blur(20px)", boxShadow: "0 8px 28px rgba(0,0,0,0.4)" }}>
          {"v "}{toast}
        </div>
      )}
    </div>
  );
}

function renderMarkdown(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks: string[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      blocks.push("<ul>" + listBuf.map((l) => `<li>${l}</li>`).join("") + "</ul>");
      listBuf = [];
    }
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }
    if (line.startsWith("- ")) {
      listBuf.push(esc(line.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"));
    } else if (line.startsWith("**") && line.endsWith("**")) {
      flushList();
      blocks.push(`<strong>${esc(line.slice(2, -2))}</strong>`);
    } else {
      flushList();
      blocks.push(`<p>${esc(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`);
    }
  }
  flushList();
  return blocks.join("");
}
