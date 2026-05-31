"use client";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", color: "#1D1D1F", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        padding: "0 2.5rem",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#1D1D1F" }}>PatrimIA</span>
          <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", color: "#8E8E93", textTransform: "uppercase", marginTop: "1px" }}>by Wikolabs</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="#agents" style={{ fontSize: "0.82rem", color: "#3C3C43", textDecoration: "none", fontWeight: 500 }}>Agents</a>
          <a href="#overlay" style={{ fontSize: "0.82rem", color: "#3C3C43", textDecoration: "none", fontWeight: 500 }}>Zéro-Hallucination</a>
          <a href="#contact" style={{ fontSize: "0.82rem", color: "#3C3C43", textDecoration: "none", fontWeight: 500 }}>Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "100%", padding: "9rem 2.5rem 7rem", textAlign: "center", background: "linear-gradient(180deg, #FAFAFA 0%, #F5F5F7 100%)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "9999px", padding: "0.35rem 1rem", marginBottom: "2.5rem" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C", display: "inline-block" }} />
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#3C3C43", letterSpacing: "0.03em" }}>Agent IA · Gestion de Patrimoine · Zéro-Hallucination</span>
        </div>

        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1D1D1F", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
          Votre patrimoine mérite<br />
          <span style={{ color: "#C9A84C" }}>une intelligence sans compromis.</span>
        </h1>

        <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#6E6E73", lineHeight: 1.65, maxWidth: "600px", margin: "0 auto 1rem", fontWeight: 400 }}>
          Quatre agents IA spécialisés analysent votre portefeuille, confrontent les sources
          et génèrent un planning d&apos;ordres — avec une transparence totale sur chaque décision.
        </p>
        <p style={{ fontSize: "0.9rem", color: "#8E8E93", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.6 }}>
          Déposez vos PDFs et screenshots. PatrimIA fait le reste.
          Chaque affirmation est vérifiable. Chaque ordre est justifié.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            data-cal-link="wikolabs-team/30min"
            data-cal-namespace="wk30min"
            data-cal-config='{"layout":"month_view"}'
            type="button"
            style={{ padding: "0.85rem 2rem", borderRadius: "0.6rem", background: "#1D1D1F", color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem", border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}
          >
            Demander une démo
          </button>
          <a
            href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20PatrimIA%20avec%20Wikolabs."
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "0.85rem 2rem", borderRadius: "0.6rem", background: "#25d366", color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
        </div>
      </section>

      {/* The 4 Agents */}
      <section id="agents" style={{ background: "#F5F5F7", padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", color: "#8E8E93", textTransform: "uppercase", marginBottom: "1rem" }}>Architecture multi-agents</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#1D1D1F", marginBottom: "1rem" }}>
            Quatre cerveaux. Une décision.
          </h2>
          <p style={{ textAlign: "center", color: "#6E6E73", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 4rem", lineHeight: 1.65 }}>
            Chaque agent a un rôle précis et indépendant. Ils débattent, confrontent, puis convergent vers un plan d&apos;action vérifiable.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🧭", name: "Leader Agent", role: "Orchestration & Décision finale", desc: "Synthétise les rapports des trois autres agents, arbitre les conflits d'analyse et génère le plan d'ordres définitif avec justification ligne par ligne.", accent: "#C9A84C" },
              { icon: "🌍", name: "Macro Agent", role: "Environnement & Contexte mondial", desc: "Analyse les taux directeurs, cycles macroéconomiques, géopolitique et corrélations entre classes d'actifs pour contextualiser chaque position du portefeuille.", accent: "#3B82F6" },
              { icon: "📈", name: "Technical Agent", role: "Signaux & Graphiques de marché", desc: "Lit les données temps réel Polygon.io, identifie niveaux de support/résistance, momentum et patterns pour qualifier les points d'entrée et de sortie.", accent: "#10B981" },
              { icon: "⚖️", name: "Avocat du Diable", role: "Contradiction & Risque systémique", desc: "Remet en question chaque décision des autres agents, identifie les biais, scénarios adverses et risques de queue pour protéger le capital en priorité.", accent: "#EF4444" },
            ].map((agent) => (
              <div key={agent.name} style={{ background: "#FFFFFF", borderRadius: "1.25rem", padding: "2rem", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", background: `${agent.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "1.25rem" }}>{agent.icon}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", color: agent.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>{agent.role}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1D1D1F", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>{agent.name}</h3>
                <p style={{ fontSize: "0.87rem", color: "#6E6E73", lineHeight: 1.65 }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "6rem 2.5rem", background: "#FAFAFA" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", color: "#8E8E93", textTransform: "uppercase", marginBottom: "1rem" }}>Flux de travail</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#1D1D1F", marginBottom: "4rem" }}>
            Trois étapes. Zéro ambiguïté.
          </h2>
          {[
            { step: "01", title: "Dépôt des données", desc: "Téléchargez vos relevés de portefeuille (PDF, screenshots, CSV). PatrimIA extrait automatiquement positions, prix de revient, dividendes et historique via pipeline OCR + VLM." },
            { step: "02", title: "Analyse multi-agents", desc: "Les quatre agents s'activent en parallèle. Macro contextualise, Technical lit les signaux, l'Avocat du Diable challenge, le Leader orchestre. Chaque affirmation est liée à une source : numéro de page du document ou timestamp Polygon.io." },
            { step: "03", title: "Planning d'ordres & Overlay de Vérité", desc: "PatrimIA génère un plan d'actions priorisé : ordres d'achat/vente, cessions pour besoin de cash, rééquilibrages. Chaque ligne affiche sa justification, sa source et le niveau de consensus entre agents." },
          ].map((item, i) => (
            <div key={item.step} style={{ display: "flex", gap: "2rem", paddingBottom: i < 2 ? "3rem" : "0", borderLeft: i < 2 ? "1px solid #E5E5EA" : "none", marginLeft: "1.5rem", paddingLeft: "2rem", position: "relative" }}>
              <div style={{ position: "absolute", left: "-1.5rem", top: "0", width: "3rem", height: "3rem", borderRadius: "50%", background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>{item.step}</div>
              <div style={{ paddingTop: "0.25rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1D1D1F", marginBottom: "0.6rem", letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#6E6E73", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zero-Hallucination */}
      <section id="overlay" style={{ background: "#1D1D1F", padding: "6rem 2.5rem", color: "#FFFFFF" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "9999px", padding: "0.35rem 1rem", marginBottom: "2rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C", display: "inline-block" }} />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#C9A84C", letterSpacing: "0.05em" }}>Overlay de Vérité — Technologie propriétaire</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1.25rem", lineHeight: 1.1 }}>
            Zéro-Hallucination.<br /><span style={{ color: "#C9A84C" }}>Chaque chiffre a une source.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#AEAEB2", lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 3.5rem" }}>
            Contrairement aux IA génératives classiques, PatrimIA ne peut pas inventer un chiffre.
            Chaque valeur affichée est extraite d&apos;un document que vous avez fourni ou d&apos;une donnée temps réel Polygon.io — et la source est toujours visible.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", textAlign: "left" }}>
            {[
              { icon: "📄", label: "Source documentaire", desc: "Chaque extraction est liée au numéro de page et au passage exact du document source." },
              { icon: "📡", label: "Donnée marché horodatée", desc: "Prix, volumes et indicateurs proviennent de Polygon.io avec timestamp UTC visible." },
              { icon: "🤝", label: "Score de consensus", desc: "Chaque décision affiche le niveau d'accord entre les 4 agents (ex: 3/4 en faveur)." },
              { icon: "🔴", label: "Désaccord explicite", desc: "Si l'Avocat du Diable s'oppose, son argument apparaît en rouge dans le plan final." },
            ].map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1.5rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.82rem", color: "#8E8E93", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data sources */}
      <section style={{ padding: "5rem 2.5rem", background: "#F5F5F7" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", color: "#8E8E93", textTransform: "uppercase", marginBottom: "2rem" }}>Sources de données connectées</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {["Polygon.io — Prix temps réel", "OCR + VLM — Extraction documentaire", "PDF · Screenshots · CSV", "Macro : BCE, FED, BRI", "Données propriétaires client"].map((s) => (
              <span key={s} style={{ padding: "0.5rem 1.25rem", borderRadius: "9999px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.82rem", fontWeight: 500, color: "#3C3C43", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: "7rem 2.5rem", background: "#FAFAFA", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#1D1D1F", marginBottom: "1rem" }}>
          Prêt à voir PatrimIA sur votre portefeuille ?
        </h2>
        <p style={{ color: "#6E6E73", fontSize: "1rem", marginBottom: "2.5rem" }}>Démo privée · Données confidentielles · Réponse sous 24h</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            data-cal-link="wikolabs-team/30min"
            data-cal-namespace="wk30min"
            data-cal-config='{"layout":"month_view"}'
            type="button"
            style={{ padding: "0.9rem 2.25rem", borderRadius: "0.6rem", background: "#1D1D1F", color: "#FFFFFF", fontWeight: 600, fontSize: "1rem", border: "none", cursor: "pointer" }}
          >
            Réserver une démo
          </button>
          <a
            href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20PatrimIA%20avec%20Wikolabs."
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "0.9rem 2.25rem", borderRadius: "0.6rem", background: "#25d366", color: "#FFFFFF", fontWeight: 600, fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", background: "#FAFAFA" }}>
        <span style={{ fontSize: "0.82rem", color: "#8E8E93" }}>
          &copy; {new Date().getFullYear()} PatrimIA — un service{" "}
          <a href="https://wikolabs.com" style={{ color: "#3C3C43", textDecoration: "none", fontWeight: 500 }}>Wikolabs</a>
        </span>
        <span style={{ fontSize: "0.78rem", color: "#AEAEB2" }}>Données confidentielles · Non régulé · À titre indicatif uniquement</span>
      </footer>
    </div>
  );
}
