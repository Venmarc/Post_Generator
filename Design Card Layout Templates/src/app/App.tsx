/**
 * OUTPUT CARD EXAMPLES — GAMMA-STYLE COMPOSITES
 * ═══════════════════════════════════════════════
 * Three reusable layout templates:
 *   A · Single Quote Card (nebula bg)
 *   B · 3-Card Carousel Collage (rotation/overlap)
 *   C · Presentation Page (6-card asymmetric grid)
 *
 * Each template lives in /src/app/components/.
 * Swap the TEMPLATE TOKENS at the top of each file.
 */

import { QuoteCard } from "./components/QuoteCard";
import { CarouselCollage } from "./components/CarouselCollage";
import { PresentationPage } from "./components/PresentationPage";

// ── Section header component
function SectionHeader({
  letter,
  title,
  description,
}: {
  letter: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ marginBottom: 32, fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "#6b7280",
            textTransform: "uppercase",
          }}
        >
          TEMPLATE {letter}
        </span>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
      </div>
      <h2
        style={{
          color: "#fff",
          fontSize: "clamp(20px, 3vw, 28px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "0 0 6px 0",
          fontFamily: "'DM Serif Display', serif",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: 13,
          margin: 0,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a12",
        padding: "clamp(24px, 5vw, 72px) clamp(16px, 6vw, 80px)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── Page header */}
      <header style={{ marginBottom: "clamp(48px, 8vw, 96px)", maxWidth: 680 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            OUTPUT CARD EXAMPLES
          </span>
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(32px, 5vw, 58px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 16px 0",
            fontFamily: "'DM Serif Display', serif",
          }}
        >
          Gamma-Style
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Card Composites
          </span>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 15,
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 520,
          }}
        >
          Three reusable layout templates — each designed to be edited by swapping
          the tokens at the top of its component file.
        </p>
      </header>

      {/* ════════════════════════════════════════════
          TEMPLATE A — SINGLE QUOTE CARD
      ════════════════════════════════════════════ */}
      <section style={{ marginBottom: "clamp(60px, 10vw, 120px)", maxWidth: 900 }}>
        <SectionHeader
          letter="A"
          title="Single Quote Card"
          description="Full-bleed nebula background · Decorative quote mark · Geometric overlays · Author attribution"
        />
        <QuoteCard />
      </section>

      {/* ════════════════════════════════════════════
          TEMPLATE B — 3-CARD CAROUSEL COLLAGE
      ════════════════════════════════════════════ */}
      <section style={{ marginBottom: "clamp(60px, 10vw, 120px)" }}>
        <SectionHeader
          letter="B"
          title="3-Card Carousel Collage"
          description="Fan overlap layout · Rotation transforms · Color-band editorial photo card · Center card elevated"
        />
        <div
          style={{
            background: "#f4f4f6",
            borderRadius: 24,
            padding: "clamp(32px, 5vw, 60px) clamp(16px, 4vw, 48px)",
            overflowX: "auto",
          }}
        >
          <CarouselCollage />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TEMPLATE C — PRESENTATION PAGE
      ════════════════════════════════════════════ */}
      <section style={{ marginBottom: 40 }}>
        <SectionHeader
          letter="C"
          title="Presentation Page"
          description="Deep gradient canvas · 6-card asymmetric grid · Hero header, image, stat, quote, features, CTA"
        />
        <PresentationPage />
      </section>

      {/* ── Footer */}
      <footer
        style={{
          marginTop: "clamp(60px, 8vw, 100px)",
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: 12,
            letterSpacing: "0.08em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          OUTPUT CARD TEMPLATES · GAMMA-STYLE
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Template A", "Template B", "Template C"].map((t, i) => (
            <span
              key={i}
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: 11,
                letterSpacing: "0.1em",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
