/**
 * TEMPLATE C — PRESENTATION PAGE (6-CARD GRID)
 * ─────────────────────────────────────────────────────
 * A full presentation "slide" with an asymmetric 6-card
 * grid on a deep gradient background.
 *
 * Grid anatomy:
 *   Row 1: [ Hero header ──────────────────────────── ]
 *   Row 2: [ Large image (7/12) ][ Stat card (5/12) ]
 *   Row 3: [ Quote (4) ][ Feature list (5) ][ CTA (3) ]
 *
 * Swap: background gradient, card images, all text tokens.
 */

// ── Card image sources
const IMG_CITY =
  "https://images.unsplash.com/photo-1757843298369-6e5503c14bfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG5pZ2h0JTIwbGlnaHRzJTIwdXJiYW58ZW58MXx8fHwxNzc0MTU0MDYzfDA&ixlib=rb-4.1.0&q=80&w=900";

const IMG_FOREST =
  "https://images.unsplash.com/photo-1715413032565-60598b963879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMGFlcmlhbCUyMHRvcCUyMHZpZXclMjBncmVlbnxlbnwxfHx8fDE3NzQxNTQwNjh8MA&ixlib=rb-4.1.0&q=80&w=600";

// ── TEMPLATE TOKENS ──────────────────────────────────
// Hero (Card 1)
const HERO_BADGE = "Q4 · 2024";
const HERO_TITLE = "Growth Strategy";
const HERO_SUBTITLE = "A visual overview of key initiatives, metrics, and opportunities for Q4 execution.";

// Image card (Card 2)
const IMG_CARD_LABEL = "Market Expansion";
const IMG_CARD_CAPTION = "Targeting 3 new metropolitan zones by year-end";

// Stat card (Card 3)
const STAT_NUMBER = "2.4×";
const STAT_LABEL = "Revenue growth vs. same period last year";
const STAT_DELTA = "+140% YoY";
const STAT_DELTA_UP = true;

// Quote card (Card 4)
const QUOTE_TEXT = "Execution separates strategy from fantasy.";
const QUOTE_AUTHOR = "— Internal Leadership Memo";

// Features card (Card 5)
const FEATURES_TITLE = "Key Focus Areas";
const FEATURES = [
  { icon: "◆", text: "Product-led growth engine", accent: "#7c3aed" },
  { icon: "◆", text: "Tier-1 enterprise pipeline", accent: "#ec4899" },
  { icon: "◆", text: "Platform partnership rollout", accent: "#06b6d4" },
  { icon: "◆", text: "Retention & NPS improvement", accent: "#f59e0b" },
];

// CTA card (Card 6)
const CTA_LABEL = "NEXT STEPS";
const CTA_TITLE = "Ready to align?";
const CTA_BTN = "View Roadmap →";
// ─────────────────────────────────────────────────────

export function PresentationPage() {
  return (
    <div
      style={{
        borderRadius: 28,
        overflow: "hidden",
        background: "linear-gradient(145deg, #0c0b1e 0%, #1a0638 35%, #0b1a38 70%, #071225 100%)",
        padding: "clamp(20px, 3vw, 36px)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── ROW 1: Hero header ── */}
      <div
        style={{
          borderRadius: 16,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "28px 32px",
          marginBottom: "clamp(12px, 2vw, 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span
              style={{
                background: "rgba(124,58,237,0.25)",
                border: "1px solid rgba(124,58,237,0.5)",
                color: "#c4b5fd",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {HERO_BADGE}
            </span>
            <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.15)" }} />
          </div>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontFamily: "'DM Serif Display', serif",
              margin: 0,
            }}
          >
            {HERO_TITLE}
          </h2>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            lineHeight: 1.6,
            maxWidth: 340,
            margin: 0,
          }}
        >
          {HERO_SUBTITLE}
        </p>
      </div>

      {/* ── ROW 2: Image card + Stat card ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: "clamp(10px, 1.5vw, 18px)",
          marginBottom: "clamp(12px, 2vw, 20px)",
        }}
      >
        {/* Card 2 — Large image */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            minHeight: 240,
          }}
        >
          <img
            src={IMG_CITY}
            alt="City"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(5,0,30,0.85) 0%, transparent 55%)",
            }}
          />
          {/* Text at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "18px 22px",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              {IMG_CARD_LABEL}
            </p>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: 0 }}>
              {IMG_CARD_CAPTION}
            </p>
          </div>
          {/* Top-right label */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(6,182,212,0.2)",
              border: "1px solid rgba(6,182,212,0.45)",
              borderRadius: 8,
              padding: "3px 10px",
              color: "#67e8f9",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
            }}
          >
            EXPANSION
          </div>
        </div>

        {/* Card 3 — Stat */}
        <div
          style={{
            borderRadius: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "28px 26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(12px)",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            GROWTH RATE
          </p>

          <div>
            {/* Big stat */}
            <div
              style={{
                fontSize: "clamp(52px, 7vw, 80px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                marginBottom: 10,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {STAT_NUMBER}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 12,
                lineHeight: 1.55,
                margin: "0 0 18px 0",
              }}
            >
              {STAT_LABEL}
            </p>
            {/* Delta badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: STAT_DELTA_UP
                  ? "rgba(34,197,94,0.15)"
                  : "rgba(239,68,68,0.15)",
                border: `1px solid ${STAT_DELTA_UP ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
                borderRadius: 8,
                padding: "4px 12px",
                color: STAT_DELTA_UP ? "#86efac" : "#fca5a5",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {STAT_DELTA_UP ? "↑" : "↓"} {STAT_DELTA}
            </div>
          </div>

          {/* Spark line (decorative) */}
          <svg width="100%" height="36" viewBox="0 0 200 36" preserveAspectRatio="none">
            <polyline
              points="0,30 30,24 60,18 90,22 120,10 150,6 180,12 200,4"
              fill="none"
              stroke="rgba(124,58,237,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="0,30 30,24 60,18 90,22 120,10 150,6 180,12 200,4"
              fill="none"
              stroke="rgba(124,58,237,0.15)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── ROW 3: Quote + Features + CTA ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 0.8fr",
          gap: "clamp(10px, 1.5vw, 18px)",
        }}
      >
        {/* Card 4 — Quote (violet) */}
        <div
          style={{
            borderRadius: 16,
            background: "linear-gradient(145deg, rgba(124,58,237,0.22) 0%, rgba(91,33,182,0.18) 100%)",
            border: "1px solid rgba(139,92,246,0.3)",
            padding: "24px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Decorative quote mark */}
          <div
            style={{
              color: "#7c3aed",
              fontSize: 56,
              lineHeight: 0.8,
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              opacity: 0.7,
            }}
          >
            &ldquo;
          </div>
          <p
            style={{
              color: "#e9d5ff",
              fontSize: 15,
              lineHeight: 1.55,
              fontStyle: "italic",
              fontFamily: "'DM Serif Display', serif",
              margin: "12px 0 16px",
              flex: 1,
            }}
          >
            {QUOTE_TEXT}
          </p>
          <p
            style={{
              color: "rgba(167,139,250,0.6)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
            }}
          >
            {QUOTE_AUTHOR}
          </p>
        </div>

        {/* Card 5 — Feature list */}
        <div
          style={{
            borderRadius: 16,
            background: "#fff",
            padding: "24px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "#0f0f1a",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.02em",
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "1px solid #f0f0f5",
            }}
          >
            {FEATURES_TITLE}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: f.accent, fontSize: 8 }}>{f.icon}</span>
                <span style={{ color: "#2a2a3d", fontSize: 13, lineHeight: 1.4 }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>
          {/* Progress bar decoration */}
          <div style={{ marginTop: 18 }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "#f0f0f5",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "68%",
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 5,
                color: "#9ca3af",
                fontSize: 10,
              }}
            >
              <span>Progress</span>
              <span>68%</span>
            </div>
          </div>
        </div>

        {/* Card 6 — CTA (dark with image accent) */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            minHeight: 180,
          }}
        >
          {/* BG image */}
          <img
            src={IMG_FOREST}
            alt="Forest"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(5,0,25,0.6) 0%, rgba(15,5,40,0.9) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {CTA_LABEL}
            </p>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  marginBottom: 14,
                  fontFamily: "'DM Serif Display', serif",
                }}
              >
                {CTA_TITLE}
              </p>
              <button
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  border: "none",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  width: "100%",
                }}
              >
                {CTA_BTN}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
