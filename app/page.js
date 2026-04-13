"use client";
import { useState, useRef, useEffect } from "react";

const STARTER_PILLS = [
  { emoji: "✨", label: "What's your superpower?" },
  { emoji: "🤝", label: "How would your teammates describe you?" },
  { emoji: "🧭", label: "How have you shaped product direction?" },
  { emoji: "💡", label: "How do you get stakeholder buy-in?" },
  { emoji: "🔬", label: "Tell me about a project you're proud of." },
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPills, setShowPills] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setShowPills(false);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops — looks like my AI twin needs a coffee break. Try again in a sec!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #f8f0e3 0%, #ede4d4 40%, #e8dcc8 100%)",
        position: "relative",
        padding: 20,
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Card container */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(26,26,46,0.08)",
          boxShadow: "0 8px 40px rgba(26,26,46,0.08), 0 1px 3px rgba(26,26,46,0.04)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          maxHeight: "90vh",
          animation: "fadeUp 0.6s ease-out",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "28px 24px 16px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2a9d8f, #5bbfb3, #3aada0)",
              padding: 3,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#1a1a2e",
              }}
            >
              <svg viewBox="0 0 100 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#1a1a2e" />
                <ellipse cx="50" cy="42" rx="31" ry="33" fill="#f0c832" />
                <rect x="19" y="42" width="62" height="22" fill="#f0c832" />
                <path d="M19 50 Q17 60 19 75 Q21 82 26 80 Q28 74 27 64 Q26 54 25 48Z" fill="#dbb52e" />
                <path d="M81 50 Q83 60 81 75 Q79 82 74 80 Q72 74 73 64 Q74 54 75 48Z" fill="#dbb52e" />
                <path d="M25 48 Q22 58 23 72 Q25 76 29 72 Q28 60 30 50Z" fill="#f0c832" />
                <path d="M75 48 Q78 58 77 72 Q75 76 71 72 Q72 60 70 50Z" fill="#f0c832" />
                <rect x="42" y="62" width="16" height="10" rx="4" fill="#f5dcc3" />
                <ellipse cx="50" cy="46" rx="22" ry="24" fill="#f5dcc3" />
                <path d="M28 38 Q30 18 50 15 Q70 18 72 38 Q70 28 60 26 Q50 30 40 26 Q30 28 28 38Z" fill="#f5d23b" />
                <path d="M28 38 Q26 44 25 50 Q27 48 30 46 Q30 42 32 38Z" fill="#e8c22a" />
                <path d="M72 38 Q74 44 75 50 Q73 48 70 46 Q70 42 68 38Z" fill="#e8c22a" />
                <ellipse cx="41" cy="44" rx="3" ry="2.5" fill="#4a6741" />
                <ellipse cx="59" cy="44" rx="3" ry="2.5" fill="#4a6741" />
                <circle cx="40" cy="43.5" r="0.8" fill="#fff" />
                <circle cx="58" cy="43.5" r="0.8" fill="#fff" />
                <path d="M36 39 Q41 37 46 39" stroke="#c9a620" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M54 39 Q59 37 64 39" stroke="#c9a620" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M50 46 Q48 51 49 52" stroke="#e8c5a8" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M43 55 Q50 60 57 55" stroke="#c47a6a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="37" cy="52" r="3" fill="rgba(210,140,120,0.2)" />
                <circle cx="63" cy="52" r="3" fill="rgba(210,140,120,0.2)" />
                <path d="M35 72 Q42 68 50 70 Q58 68 65 72 Q68 80 68 85 L32 85 Q32 80 35 72Z" fill="#2a9d8f" />
              </svg>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 28,
                fontWeight: 400,
                color: "#1a1a2e",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Margaret Hiden
            </h1>
            <p style={{ fontSize: 14, color: "#6b635a", marginTop: 2, fontWeight: 500 }}>
              UX Research &amp; Strategy
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {["Service Design", "Measurement Geek", "Workshop Facilitator"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#2a9d8f",
                    background: "rgba(42,157,143,0.08)",
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(26,26,46,0.1), transparent)",
            margin: "0 24px",
          }}
        />

        {/* Chat area */}
        <div
          className="chat-area"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minHeight: 180,
            maxHeight: 340,
          }}
        >
          {messages.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "12px 8px", animation: "fadeUp 0.5s ease-out 0.2s both" }}>
              <p style={{ fontSize: 15, color: "#1a1a2e", lineHeight: 1.6 }}>
                Hey there! 👋 I&apos;m Margaret&apos;s AI twin. Ask me anything about my work, projects, or what makes me tick as a UX practitioner.
              </p>
              <p style={{ fontSize: 13, color: "#9a9494", marginTop: 12, fontStyle: "italic" }}>
                Or tap a question below to get started:
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                animation: "fadeUp 0.3s ease-out",
              }}
            >
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#1a1a2e",
                    color: "#f8f0e3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontFamily: "'DM Serif Display', serif",
                    flexShrink: 0,
                  }}
                >
                  M
                </div>
              )}
              <div
                style={
                  msg.role === "user"
                    ? {
                        maxWidth: "78%",
                        background: "#1a1a2e",
                        color: "#f8f0e3",
                        padding: "10px 16px",
                        borderRadius: "18px 18px 4px 18px",
                        fontSize: 14,
                        lineHeight: 1.55,
                      }
                    : {
                        maxWidth: "78%",
                        background: "rgba(42,157,143,0.07)",
                        color: "#1a1a2e",
                        padding: "10px 16px",
                        borderRadius: "18px 18px 18px 4px",
                        fontSize: 14,
                        lineHeight: 1.55,
                        border: "1px solid rgba(42,157,143,0.1)",
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, animation: "fadeUp 0.3s ease-out" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#1a1a2e",
                  color: "#f8f0e3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontFamily: "'DM Serif Display', serif",
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div
                style={{
                  maxWidth: "78%",
                  background: "rgba(42,157,143,0.07)",
                  color: "#2a9d8f",
                  padding: "10px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  fontSize: 14,
                  border: "1px solid rgba(42,157,143,0.1)",
                }}
              >
                <span style={{ display: "inline-flex", gap: 4 }}>
                  <span style={{ animation: "pulse1 1.4s infinite" }}>●</span>
                  <span style={{ animation: "pulse2 1.4s infinite" }}>●</span>
                  <span style={{ animation: "pulse3 1.4s infinite" }}>●</span>
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Starter pills */}
        {showPills && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              padding: "4px 20px 12px",
              justifyContent: "center",
              animation: "fadeUp 0.5s ease-out 0.4s both",
            }}
          >
            {STARTER_PILLS.map((p, i) => (
              <button key={i} className="pill-btn" onClick={() => sendMessage(p.label)}>
                <span style={{ marginRight: 6 }}>{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderTop: "1px solid rgba(26,26,46,0.06)",
            background: "rgba(255,255,255,0.6)",
          }}
        >
          <input
            className="input-field"
            placeholder="Ask Margaret anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="send-btn"
            style={{ opacity: input.trim() && !loading ? 1 : 0.4 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
          >
            ↑
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#b0a89e",
            padding: "8px 16px 16px",
            letterSpacing: "0.02em",
          }}
        >
          Powered by Claude · This is Margaret&apos;s AI twin, not Margaret herself
        </p>
      </div>
    </div>
  );
}
