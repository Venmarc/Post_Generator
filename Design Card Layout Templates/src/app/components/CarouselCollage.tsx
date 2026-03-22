/**
 * TEMPLATE B — 3-CARD CAROUSEL COLLAGE
 * ─────────────────────────────────────────────────────
 * Three overlapping, rotated cards in a fan layout.
 * Cards: [Image+band], [Editorial text], [Stat/accent]
 * Swap: card images, titles, body text, accent colors,
 *       rotation angles (Card1: -8°, Card3: +7°).
 */

// ── Card image sources
const IMG_PORTRAIT =
  "https://images.unsplash.com/photo-1770062422145-c4c08e1f5cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGJsYWNrJTIwd2hpdGUlMjBkcmFtYXRpYyUyMHN0dWRpbyUyMGxpZ2h0fGVufDF8fHx8MTc3NDE1NDA2M3ww&ixlib=rb-4.1.0&q=80&w=600";

const IMG_ABSTRACT =
  "https://images.unsplash.com/photo-1771931278406-e3deaf47d786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwbmVvbiUyMGdlb21ldHJpYyUyMGRhcmt8ZW58MXx8fHwxNzc0MTU0MDYwfDA&ixlib=rb-4.1.0&q=80&w=600";

// ── TEMPLATE TOKENS ──────────────────────────────────
// Card 1 — image + color band overlay (editorial style)
const CARD1_LABEL = "VOL. 04";
const CARD1_TITLE = "Visual Identity";
const CARD1_BAND_COLOR = "#ef4444"; // red band across image

// Card 2 — center editorial text card
const CARD2_EYEBROW = "FEATURED STORY";
const CARD2_HEADLINE = "Design at the Edge of Chaos";
const CARD2_BODY =
  "When constraints collapse, creativity floods in. The designers rewriting the rules of visual language.";
const CARD2_TAG = "#CULTURE";

// Card 3 — stat/dark accent card
const CARD3_STAT = "97%";
const CARD3_STAT_LABEL = "of first impressions are design-driven";
const CARD3_SUB = "Nielsen Norman Group, 2024";
// ─────────────────────────────────────────────────────

const CARD_W = 270;
const CARD_H = 390;

export function CarouselCollage() {
  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      {/* ── Fan stack wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 860,
          height: CARD_H + 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ─── CARD 1: Image + red band overlay (left, rotated back) */}
        <div
          style={{
            position: "absolute",
            width: CARD_W,
            height: CARD_H,
            left: "calc(50% - 330px)",
            top: 40,
            transform: "rotate(-8deg)",
            zIndex: 1,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* BW portrait photo */}
          <img
            src={IMG_PORTRAIT}
            alt="Portrait"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(100%) contrast(1.1)",
            }}
          />
          {/* Color band across the middle — editorial style */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "38%",
              height: 52,
              background: CARD1_BAND_COLOR,
              opacity: 0.82,
              mixBlendMode: "multiply",
            }}
          />
          {/* Card labels */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: 18,
              right: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              {CARD1_TITLE}
            </span>
            <span
              style={{
                color: CARD1_BAND_COLOR,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                background: "#fff",
                padding: "2px 7px",
                borderRadius: 4,
              }}
            >
              {CARD1_LABEL}
            </span>
          </div>
        </div>

        {/* ─── CARD 2: Center editorial text card (front) */}
        <div
          style={{
            position: "absolute",
            width: CARD_W,
            height: CARD_H,
            left: "calc(50% - 135px)",
            top: 10,
            zIndex: 3,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 28px 80px rgba(0,0,0,0.28)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: 26,
          }}
        >
          {/* Top accent bar */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            <div style={{ width: 32, height: 3, background: "#7c3aed", borderRadius: 2 }} />
            <div style={{ width: 10, height: 3, background: "#ec4899", borderRadius: 2 }} />
          </div>

          <p
            style={{
              color: "#7c3aed",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {CARD2_EYEBROW}
          </p>

          <h3
            style={{
              color: "#0f0f1a",
              fontSize: 22,
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 14,
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            {CARD2_HEADLINE}
          </h3>

          <p
            style={{
              color: "#4b4b6a",
              fontSize: 13,
              lineHeight: 1.65,
              fontWeight: 400,
              flex: 1,
            }}
          >
            {CARD2_BODY}
          </p>

          {/* Bottom tag + arrow */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid #ebebf0",
            }}
          >
            <span
              style={{
                color: "#ec4899",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {CARD2_TAG}
            </span>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#0f0f1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── CARD 3: Stat / dark accent card (right, rotated back) */}
        <div
          style={{
            position: "absolute",
            width: CARD_W,
            height: CARD_H,
            left: "calc(50% + 60px)",
            top: 30,
            transform: "rotate(7deg)",
            zIndex: 2,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* Background image */}
          <img
            src={IMG_ABSTRACT}
            alt="Abstract"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(15,0,40,0.85) 0%, rgba(60,10,100,0.70) 100%)",
            }}
          />
          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 26,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* Stat number */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                marginBottom: 8,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {CARD3_STAT}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 13,
                lineHeight: 1.55,
                marginBottom: 14,
              }}
            >
              {CARD3_STAT_LABEL}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 1, background: "#a78bfa" }} />
              <span
                style={{ color: "#a78bfa", fontSize: 10, letterSpacing: "0.1em", fontWeight: 600 }}
              >
                {CARD3_SUB}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dot indicators (carousel nav hint) */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === 1 ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === 1 ? "#7c3aed" : "#d1d5db",
              transition: "width 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
