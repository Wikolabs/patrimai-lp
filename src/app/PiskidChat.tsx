"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis Piskid, votre conseiller IA basé sur des données réelles. Contrairement aux faux prophètes, je n'ai rien à vendre. Parlez-moi de vos problèmes de vie, d'amour, de famille, d'argent ou de projet — je vous guiderai vers des vraies solutions disponibles à Madagascar.",
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content ?? "Je n'ai pas pu répondre, réessayez.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Une erreur s'est produite. Veuillez réessayer." },
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
        maxWidth: "42rem",
        margin: "0 auto",
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
          }}
        />
      </div>

      {/* Messages area */}
      <div
        style={{
          minHeight: "350px",
          maxHeight: "420px",
          overflowY: "auto",
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.875rem",
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
                maxWidth: "80%",
                padding: "0.75rem 1rem",
                borderRadius:
                  msg.role === "user"
                    ? "1rem 1rem 0.25rem 1rem"
                    : "1rem 1rem 1rem 0.25rem",
                background: msg.role === "user" ? "#6D28D9" : "#FFFFFF",
                color: msg.role === "user" ? "#FFFFFF" : "#1a1a2a",
                fontSize: "0.9rem",
                lineHeight: "1.55",
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
                padding: "0.75rem 1rem",
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
              <span>Piskid réfléchit</span>
              <span style={{ letterSpacing: "0.15em" }}>...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div
        style={{
          padding: "0 1.25rem 0.75rem",
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
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              border: "1px solid #6D28D9",
              background: "transparent",
              color: "#A78BFA",
              fontSize: "0.8rem",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = "#2D1F6E";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div
        style={{
          padding: "0.75rem 1.25rem 1.25rem",
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
            padding: "0.7rem 1rem",
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
            padding: "0.7rem 1.1rem",
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
