"use client";

import PiskidChat from "./PiskidChat";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F0A1E", color: "#F3F0FF" }}>

      {/* Navbar */}
      <nav style={{
        background: "rgba(15,10,30,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #2D1F6E",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.35rem" }}>🔮</span>
          <span style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#A78BFA",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}>
            piskid.com
          </span>
        </div>
        <span style={{ fontSize: "0.85rem", color: "#9CA3AF", fontStyle: "italic" }}>
          Votre mpisikidy IA
        </span>
      </nav>

      {/* Chatbot section — full width, directly below navbar */}
      <section id="chat" style={{
        width: "100%",
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "2.5rem 1.5rem 5rem",
      }}>
        <PiskidChat />
      </section>

      {/* Topics */}
      <section style={{
        maxWidth: "60rem",
        margin: "0 auto",
        padding: "0 1.5rem 5rem",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
          fontWeight: 800,
          fontFamily: "var(--font-display)",
          color: "#F3F0FF",
          marginBottom: "2rem",
        }}>
          Ce que Piskid analyse pour vous
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}>
          {[
            { icon: "💔", title: "Amour et famille", desc: "Difficultés relationnelles, rupture, conflits familiaux, mariage" },
            { icon: "💰", title: "Argent et finances", desc: "Dettes, épargne, mauvaise gestion, investissements à Madagascar" },
            { icon: "🚀", title: "Projets et carrière", desc: "Projet qui échoue, recherche d'emploi, entrepreneuriat, reconversion" },
            { icon: "🌍", title: "Opportunités à Mada", desc: "Unipod, Maison du Numérique, JCI, Join Scout, BNI Madagascar" },
          ].map((card) => (
            <div key={card.title} style={{
              background: "#1E1340",
              border: "1px solid #2D1F6E",
              borderRadius: "1rem",
              padding: "1.5rem",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{card.icon}</div>
              <h3 style={{
                fontWeight: 700,
                fontSize: "1rem",
                color: "#A78BFA",
                marginBottom: "0.4rem",
                fontFamily: "var(--font-display)",
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9CA3AF", lineHeight: 1.55 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        maxWidth: "44rem",
        margin: "0 auto",
        padding: "3rem 1.5rem 5rem",
        textAlign: "center",
      }}>
        <p style={{ color: "#6D5FA8", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
          Une question sur Piskid ? L&apos;équipe Wikolabs vous répond sur WhatsApp.
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

      <footer style={{
        borderTop: "1px solid #2D1F6E",
        padding: "1.5rem",
        textAlign: "center",
        color: "#6D5FA8",
        fontSize: "0.8rem",
      }}>
        &copy; {new Date().getFullYear()} Piskid, un service{" "}
        <a href="https://wikolabs.com" style={{ color: "#A78BFA", textDecoration: "none" }}>
          Wikolabs
        </a>
        . Conseil gratuit pour tous les Malgaches.
      </footer>
    </div>
  );
}
