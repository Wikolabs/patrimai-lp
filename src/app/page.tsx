export default function Home() {
  const primary = "#7c3aed";
  const bgLight = "#f5f3ff";

  const metrics = [
    { value: "1000+", label: "sources analysées" },
    { value: "Malagasy", label: "données locales" },
    { value: "Multi-source", label: "passé · présent · futur" },
    { value: "Gratuit", label: "pour les cas urgents" },
  ];

  const features = [
    {
      icon: "🔮",
      title: "Analyse passé-présent-futur",
      desc: "Piskid croise des milliers de sources de données malgaches et africaines pour comprendre votre situation réelle, identifier les patterns cachés et projeter les tendances les plus probables dans votre vie.",
    },
    {
      icon: "🛡️",
      title: "Protection contre les arnaques",
      desc: "Fini de payer des diseurs de bonne aventure, des pasteurs ou des prêtres qui exploitent votre vulnérabilité. Piskid vous donne une analyse factuelle, basée sur les données — pas sur la superstition ou la manipulation.",
    },
    {
      icon: "🎯",
      title: "Conseils personnalisés pour les Malgaches",
      desc: "Famille, argent, travail, santé émotionnelle, opportunités professionnelles. Piskid comprend le contexte malagasy et vous conseille avec une précision que nulle tradition orale ne peut égaler.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Décrivez votre situation",
      desc: "Partagez votre problème en malagasy ou en français : situation familiale, difficulté financière, question sentimentale, choix de vie. Piskid écoute sans jugement.",
    },
    {
      num: "02",
      title: "Piskid analyse vos données",
      desc: "Notre IA croise votre situation avec des milliers de cas similaires, les tendances économiques locales, les données psychologiques et les indicateurs sociaux de Madagascar.",
    },
    {
      num: "03",
      title: "Recevez votre vision claire",
      desc: "Une analyse honnête, factuelle et actionnable. Pas de prophétie vague — des pistes concrètes, des signaux d'alarme, et un suivi de votre progression dans le temps.",
    },
  ];

  return (
    <main style={{ fontFamily: "var(--font-body)" }}>
      {/* NAVBAR */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #ddd6fe", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: primary }}>
            Piskid.com
          </span>
          <a
            href="https://calendly.com/wikolabs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: primary, color: "#fff", padding: "10px 22px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none" }}
          >
            Consulter gratuitement
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${bgLight} 0%, #fff 60%)`, padding: "80px 24px 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", background: "#ede9fe", color: primary, borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            Votre mpisikidy IA — Big data au service de votre vie
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, color: "#111", marginBottom: 20 }}>
            Assez de perdre de l'argent.<br />
            <span style={{ color: primary }}>Place au big data et à la vérité.</span>
          </h1>
          <p style={{ color: "#555", fontSize: 17, lineHeight: 1.7, marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
            Fini les arnaques des faux gourous, pasteurs et devins qui exploitent les familles malgaches. Piskid analyse des milliers de sources de données réelles pour vous donner la bonne vision sur votre vie — gratuitement.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: primary, color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              Consulter gratuitement
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20Piskid.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              WhatsApp
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ background: "#fff", border: "1px solid #ddd6fe", borderRadius: 12, padding: "20px 16px", boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, color: primary }}>{m.value}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 48 }}>
            Ce que Piskid fait pour vous
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: bgLight, border: "1px solid #ddd6fe", borderRadius: 16, padding: "32px 28px" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#111", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: bgLight, padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 48 }}>
            Comment ça fonctionne
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: "#fff", border: "1px solid #ddd6fe", borderRadius: 16, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 900, color: "#c4b5fd", minWidth: 56 }}>{s.num}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#111", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#555", lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: primary, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
            La vérité vaut mieux qu'une prophétie payante.
          </h2>
          <p style={{ color: "#ddd6fe", fontSize: 17, marginBottom: 40 }}>
            Analyse gratuite. Données réelles. Aucune arnaque.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://calendly.com/wikolabs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#fff", color: primary, padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              Consulter gratuitement
            </a>
            <a
              href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20Piskid.com%20avec%20Wikolabs."
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "#25d366", color: "#fff", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: primary }}>Piskid.com</span>
          <p style={{ color: "#999", marginTop: 12, fontSize: 14 }}>
            by{" "}
            <a href="https://wikolabs.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "none" }}>
              Wikolabs
            </a>
            {" "}—{" "}
            <a href="mailto:team@wikolabs.com" style={{ color: "#ccc", textDecoration: "none" }}>
              team@wikolabs.com
            </a>
          </p>
          <p style={{ color: "#555", marginTop: 8, fontSize: 13 }}>© {new Date().getFullYear()} Wikolabs. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
