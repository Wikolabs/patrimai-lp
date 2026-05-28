import PiskidChat from "./PiskidChat";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0A1E", color: "#F3F0FF" }}>
      {/* ─── Navbar ─────────────────────────────────────────────────── */}
      <nav
        style={{
          background: "rgba(15,10,30,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2D1F6E",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.35rem" }}>🔮</span>
          <span
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "#A78BFA",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            piskid.com
          </span>
        </div>
        <span style={{ fontSize: "0.85rem", color: "#9CA3AF", fontStyle: "italic" }}>
          Votre mpisikidy IA
        </span>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "5rem 1.5rem 3.5rem",
          textAlign: "center",
        }}
      >
        {/* Warning badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Faux pasteur ❌", bg: "#3B0A0A", color: "#EF4444", border: "#7F1D1D" },
            { label: "Devin indien ❌", bg: "#3B0A0A", color: "#EF4444", border: "#7F1D1D" },
            { label: "Médium arnaqueur ❌", bg: "#3B0A0A", color: "#EF4444", border: "#7F1D1D" },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "9999px",
                background: b.bg,
                color: b.color,
                border: `1px solid ${b.border}`,
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              {b.label}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            marginBottom: "1.25rem",
            color: "#F3F0FF",
          }}
        >
          Arrêtez de donner votre argent{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #A78BFA, #F59E0B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            aux charlatans.
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#9CA3AF",
            lineHeight: 1.7,
            maxWidth: "44rem",
            margin: "0 auto 2rem",
          }}
        >
          Des milliers de Malgaches perdent leurs économies chaque année auprès de faux pasteurs,
          de devins indiens et d&apos;araqueurs. Piskid utilise l&apos;IA et des vraies données pour
          vous conseiller sur votre vie — gratuitement.
        </p>

        {/* Green badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Données réelles ✓", bg: "#052e16", color: "#22c55e", border: "#14532d" },
            { label: "IA éthique ✓", bg: "#052e16", color: "#22c55e", border: "#14532d" },
            { label: "Gratuit ✓", bg: "#052e16", color: "#22c55e", border: "#14532d" },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                padding: "0.35rem 0.9rem",
                borderRadius: "9999px",
                background: b.bg,
                color: b.color,
                border: `1px solid ${b.border}`,
                fontSize: "0.82rem",
                fontWeight: 600,
              }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Chatbot section ─────────────────────────────────────────── */}
      <section
        id="chat"
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            color: "#A78BFA",
            marginBottom: "1.75rem",
          }}
        >
          Parlez à votre mpisikidy IA
        </h2>
        <PiskidChat />
      </section>

      {/* ─── Topics cards ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            color: "#F3F0FF",
            marginBottom: "2rem",
          }}
        >
          Ce que Piskid peut faire pour vous
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {[
            {
              icon: "💔",
              title: "Amour & Relations",
              desc: "Difficultés relationnelles, rupture, famille",
            },
            {
              icon: "💰",
              title: "Argent & Finances",
              desc: "Dettes, épargne, mauvaise gestion",
            },
            {
              icon: "🚀",
              title: "Projets & Carrière",
              desc: "Projet qui échoue, recherche d'emploi",
            },
            {
              icon: "🌍",
              title: "Opportunités Madagascar",
              desc: "Unipod, Maison du Numérique, JCI, Join Scout",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#1E1340",
                border: "1px solid #2D1F6E",
                borderRadius: "1rem",
                padding: "1.5rem",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "#6D28D9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "#2D1F6E")
              }
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{card.icon}</div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#A78BFA",
                  marginBottom: "0.4rem",
                  fontFamily: "var(--font-display)",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF", lineHeight: 1.55 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Opportunities section ───────────────────────────────────── */}
      <section
        style={{
          background: "#1E1340",
          borderTop: "1px solid #2D1F6E",
          borderBottom: "1px solid #2D1F6E",
          padding: "4rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.3rem 0.9rem",
                borderRadius: "9999px",
                background: "#2D1F6E",
                color: "#A78BFA",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              Ressources réelles à Madagascar
            </span>
            <h2
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                fontWeight: 800,
                fontFamily: "var(--font-display)",
                color: "#F3F0FF",
              }}
            >
              Ce que peu de Malgaches connaissent
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                icon: "🏛️",
                name: "Unipod",
                badge: "Innovation",
                badgeColor: "#F59E0B",
                desc: "Hub d'innovation de l'Université d'Antananarivo. Pour les jeunes entrepreneurs et startuppers. Accès à du mentorat, des espaces de travail et des financements.",
              },
              {
                icon: "💻",
                name: "Maison du Numérique",
                badge: "Formation gratuite",
                badgeColor: "#22c55e",
                desc: "Programme gouvernemental de formation au numérique. Apprenez le développement web, le design, le marketing digital — gratuitement.",
              },
              {
                icon: "🤝",
                name: "JCI Madagascar",
                badge: "Leadership",
                badgeColor: "#A78BFA",
                desc: "Junior Chamber International. Développement personnel, leadership, réseau professionnel. Pour les 18-40 ans.",
              },
              {
                icon: "⚜️",
                name: "Join Scout",
                badge: "Communauté",
                badgeColor: "#38bdf8",
                desc: "Organisation de développement de la jeunesse. Compétences pratiques, valeurs, communauté active.",
              },
            ].map((opp) => (
              <div
                key={opp.name}
                style={{
                  background: "#160D35",
                  border: "1px solid #2D1F6E",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{opp.icon}</span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#F3F0FF",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {opp.name}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      background: "rgba(109,40,217,0.2)",
                      color: opp.badgeColor,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opp.badge}
                  </span>
                </div>
                <p style={{ fontSize: "0.855rem", color: "#9CA3AF", lineHeight: 1.6 }}>{opp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Footer ──────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "44rem",
          margin: "0 auto",
          padding: "4rem 1.5rem 5rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            color: "#F3F0FF",
            marginBottom: "0.6rem",
          }}
        >
          Une question ? Notre équipe peut vous aider
        </h2>
        <p style={{ color: "#9CA3AF", fontSize: "0.95rem", marginBottom: "1.75rem" }}>
          Discutez directement avec l&apos;équipe Wikolabs sur WhatsApp.
        </p>
        <a
          href="https://wa.me/261386626100?text=Bonjour%2C%20je%20souhaite%20discuter%20de%20piskid.com%20avec%20Wikolabs."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.9rem 2rem",
            borderRadius: "0.75rem",
            background: "#25d366",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Discuter sur WhatsApp
        </a>
      </section>

      {/* ─── Footer bar ──────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid #2D1F6E",
          padding: "1.5rem",
          textAlign: "center",
          color: "#9CA3AF",
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} Piskid — Un service{" "}
        <a href="https://wikolabs.com" style={{ color: "#A78BFA", textDecoration: "none" }}>
          Wikolabs
        </a>
        . Conseil IA gratuit pour tous les Malgaches.
      </footer>
    </div>
  );
}
