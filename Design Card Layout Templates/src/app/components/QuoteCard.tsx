/**
 * TEMPLATE A — SINGLE QUOTE CARD
 * ─────────────────────────────────────────────────────
 * A full-bleed quote card on a nebula/cosmic background.
 * Swap: nebulaBg, quoteText, authorName, authorTitle,
 *       accentColor (tagLabel, divider, quote mark).
 */

const nebulaBg =
  "https://images.unsplash.com/photo-1557264322-b44d383a2906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwc3BhY2UlMjBuZWJ1bGElMjBwdXJwbGUlMjBjb3NtaWN8ZW58MXx8fHwxNzc0MTU0MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

// ── TEMPLATE TOKENS ──────────────────────────────────
const QUOTE_TEXT =
  "The best way to predict the future is to design it yourself.";
const AUTHOR_NAME = "Buckminster Fuller";
const AUTHOR_TITLE = "Architect & Futurist";
const TAG_LABEL = "INSIGHT";
// ─────────────────────────────────────────────────────

export function QuoteCard() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      style={{ minHeight: 500, fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── Background image */}
      <img
        src={nebulaBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(1.3)" }}
      />
      {/* ── Dark overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,0,20,0.78) 0%, rgba(10,0,40,0.55) 100%)" }} />

      {/* ── Decorative circles */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 340,
          right: -60,
          top: -80,
          border: "1px solid rgba(168,85,247,0.25)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 180,
          height: 180,
          right: 60,
          bottom: 30,
          border: "1px solid rgba(236,72,153,0.22)",
        }}
      />
      {/* ── Accent glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          right: 40,
          top: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Content */}
      <div className="relative z-10 flex flex-col h-full p-10 md:p-14" style={{ minHeight: 500 }}>
        {/* Tag label */}
        <div className="flex items-center gap-3 mb-10">
          <span
            style={{
              color: "#22d3ee",
              fontSize: 11,
              letterSpacing: "0.22em",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {TAG_LABEL}
          </span>
          <div style={{ width: 40, height: 1, background: "#22d3ee", opacity: 0.7 }} />
        </div>

        {/* Giant quote mark — decorative */}
        <div
          style={{
            color: "#a855f7",
            fontSize: 140,
            lineHeight: 0.7,
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            marginBottom: 8,
            opacity: 0.85,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <p
          className="text-white max-w-2xl"
          style={{
            fontSize: "clamp(22px, 3.2vw, 36px)",
            fontWeight: 300,
            lineHeight: 1.42,
            letterSpacing: "-0.01em",
            fontFamily: "'DM Serif Display', Georgia, serif",
            marginBottom: "auto",
          }}
        >
          {QUOTE_TEXT}
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-4 mt-10">
          <div style={{ width: 36, height: 2, background: "#ec4899", borderRadius: 2 }} />
          <div>
            <p
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {AUTHOR_NAME}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 12,
                letterSpacing: "0.06em",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {AUTHOR_TITLE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
