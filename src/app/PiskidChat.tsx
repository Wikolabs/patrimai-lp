"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis Piskid, votre conseiller basé sur des données réelles. Contrairement aux faux prophètes, je n'ai rien à vendre. Parlez-moi de vos problèmes de vie, d'amour, de famille, d'argent ou de projet.",
};

const QUICK_QUESTIONS = [
  "Problèmes d'argent",
  "Ma vie amoureuse",
  "Projet qui échoue",
  "Opportunités à Mada",
];

export default function PiskidChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const showIntro = messages.length === 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Exclude the initial assistant greeting — Groq rejects conversations starting with assistant role
      const apiMessages = updatedMessages.filter((m) => m !== INITIAL_MESSAGE);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      // route.ts always returns JSON with a `content` field now (even on error)
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content ?? "Je n'ai pas pu répondre, réessayez." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erreur réseau. Vérifiez votre connexion et réessayez." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      style={{
        background: "#160D35",
        borderRadius: "1.25rem",
        border: "1px solid #2D1F6E",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxShadow: "0 8px 40px rgba(109,40,217,0.18)",
      }}
    >
      {/* Chat header */}
      <div
        style={{
          background: "#1E1340",
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #2D1F6E",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6D28D9, #A78BFA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          🔮
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#A78BFA", fontSize: "1rem" }}>Piskid</div>
          <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Conseiller IA • Toujours disponible</div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            width: "0.6rem",
            height: "0.6rem",
            borderRadius: "50%",
            background: "#22c55e",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Intro panel — visible only before the first user message */}
      {showIntro && (
        <div
          style={{
            padding: "2rem 2.5rem 1.75rem",
            borderBottom: "1px solid #2D1F6E",
            background: "#0F0A1E",
            textAlign: "center",
          }}
        >
          {/* Red badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            {[
              { label: "Faux pasteur ❌" },
              { label: "Devin indien ❌" },
              { label: "Médium arnaqueur ❌" },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  padding: "0.3rem 0.85rem",
                  borderRadius: "9999px",
                  background: "#3B0A0A",
                  color: "#EF4444",
                  border: "1px solid #7F1D1D",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "clamp(1.35rem, 3vw, 2.1rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
              marginBottom: "1rem",
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
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "0.9rem",
              color: "#9CA3AF",
              lineHeight: 1.7,
              maxWidth: "56rem",
              margin: "0 auto 0.75rem",
            }}
          >
            Des milliers de Malgaches perdent leurs économies chaque année auprès de faux pasteurs,
            de devins indiens et d&apos;arnaqueurs qui exploitent la souffrance des gens.
            Piskid croise une multitude de données réelles : historiques personnels, actualités mondiales
            et malgaches, analyses comportementales, cycles climatiques, interprétation des rêves,
            tendances astrologiques et votre historique de situations difficiles pour vous offrir
            une vision claire de votre situation et vous aider à prendre les bonnes décisions.
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#6D5FA8",
              lineHeight: 1.65,
              maxWidth: "48rem",
              margin: "0 auto 1.25rem",
            }}
          >
            Contrairement aux IA généralistes, Piskid analyse votre historique de vie,
            vos objectifs personnels, vos schémas comportementaux et vous propose des actions
            concrètes adaptées à votre réalité malgache.
          </p>

          {/* Green badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Données réelles ✓" },
              { label: "Analyse historique ✓" },
              { label: "Gratuit ✓" },
            ].map((b) => (
              <span
                key={b.label}
                style={{
                  padding: "0.3rem 0.85rem",
                  borderRadius: "9999px",
                  background: "#052e16",
                  color: "#22c55e",
                  border: "1px solid #14532d",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Messages area */}
      <div
        style={{
          minHeight: showIntro ? "160px" : "540px",
          maxHeight: showIntro ? "200px" : "660px",
          overflowY: "auto",
          padding: "1.25rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "78%",
                padding: "0.85rem 1.1rem",
                borderRadius:
                  msg.role === "user"
                    ? "1rem 1rem 0.25rem 1rem"
                    : "1rem 1rem 1rem 0.25rem",
                background: msg.role === "user" ? "#6D28D9" : "#FFFFFF",
                color: msg.role === "user" ? "#FFFFFF" : "#1a1a2a",
                fontSize: "0.925rem",
                lineHeight: "1.6",
                boxShadow:
                  msg.role === "user"
                    ? "0 2px 12px rgba(109,40,217,0.35)"
                    : "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "1rem 1rem 1rem 0.25rem",
                background: "#FFFFFF",
                color: "#6D28D9",
                fontSize: "0.85rem",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span>Piskid analyse votre situation</span>
              <span style={{ letterSpacing: "0.15em" }}>...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div
        style={{
          padding: "0 1.5rem 0.875rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              border: "none",
              background: "#2D1F6E",
              color: "#A78BFA",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = "#3D2A8E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#2D1F6E";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "0.75rem 1.5rem 1.5rem",
          display: "flex",
          gap: "0.75rem",
          borderTop: "1px solid #2D1F6E",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez votre question à Piskid..."
          disabled={isLoading}
          style={{
            flex: 1,
            background: "#1E1340",
            border: "1px solid #2D1F6E",
            borderRadius: "0.75rem",
            padding: "0.8rem 1rem",
            color: "#F3F0FF",
            fontSize: "0.9rem",
            outline: "none",
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !input.trim()}
          style={{
            background: "#6D28D9",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.8rem 1.25rem",
            color: "#FFFFFF",
            fontSize: "1rem",
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            transition: "background 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            if (!isLoading && input.trim())
              (e.currentTarget as HTMLButtonElement).style.background = "#5B21B6";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#6D28D9";
          }}
          aria-label="Envoyer"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
