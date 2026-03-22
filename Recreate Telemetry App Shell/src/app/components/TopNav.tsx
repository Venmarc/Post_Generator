import { useState } from "react";
import { Bell, Search, Zap, Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

const NAV_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Monitors", id: "monitors" },
  { label: "Integrations", id: "integrations" },
  { label: "Privacy", id: "privacy" },
  { label: "Data", id: "data" },
  { label: "Logs", id: "logs" },
];

export function TopNav() {
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <header
        style={{ background: "#0D0D14", borderBottom: "1px solid rgba(124,58,237,0.15)" }}
        className="w-full h-12 flex items-stretch shrink-0 z-30 relative"
      >
        {/* Brand icon — only show the square icon slot on desktop */}
        {!isMobile && (
          <div
            style={{ width: 72, borderRight: "1px solid rgba(255,255,255,0.05)" }}
            className="flex items-center justify-center shrink-0"
          >
            <div
              style={{ background: "#7C3AED", boxShadow: "0 0 12px #7C3AED88" }}
              className="w-5 h-5 rounded-md flex items-center justify-center"
            >
              <Zap size={11} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
        )}

        {/* Brand wordmark */}
        <div
          style={{
            borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)",
            paddingLeft: isMobile ? 16 : undefined,
          }}
          className="flex items-center px-4 shrink-0"
        >
          {isMobile && (
            <div
              style={{ background: "#7C3AED", boxShadow: "0 0 12px #7C3AED88", marginRight: 10 }}
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            >
              <Zap size={11} color="#fff" strokeWidth={2.5} />
            </div>
          )}
          <span
            style={{
              color: "#F0F0FF",
              letterSpacing: "0.18em",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            TELEMETRY
          </span>
        </div>

        {/* Nav tabs — desktop only */}
        {!isMobile && (
          <nav className="flex items-stretch flex-1 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    color: isActive ? "#F0F0FF" : "#6B6B8A",
                    fontSize: 13,
                    fontWeight: isActive ? 500 : 400,
                    position: "relative",
                    transition: "color 0.15s",
                    background: "none",
                    border: "none",
                  }}
                  className="px-4 h-full flex items-center cursor-pointer"
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 12,
                        right: 12,
                        height: 2,
                        background: "#7C3AED",
                        borderRadius: "2px 2px 0 0",
                        boxShadow: "0 0 8px #7C3AED",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Spacer on mobile */}
        {isMobile && <div style={{ flex: 1 }} />}

        {/* Right actions */}
        <div className="flex items-center gap-1 px-3">
          {!isMobile && (
            <button
              style={{ color: "#6B6B8A", background: "rgba(255,255,255,0.04)", border: "none" }}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Search size={14} />
            </button>
          )}
          <button
            style={{ color: "#6B6B8A", background: "rgba(255,255,255,0.04)", border: "none", position: "relative" }}
            className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Bell size={14} />
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7C3AED",
                boxShadow: "0 0 6px #7C3AED",
                border: "1.5px solid #0D0D14",
              }}
            />
          </button>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #4F1DB3)",
              marginLeft: 2,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            SR
          </div>
          {/* Hamburger on mobile */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{ color: "#9090B0", background: "rgba(255,255,255,0.04)", border: "none", marginLeft: 4 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          )}
        </div>

        {/* Accent glow line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: isMobile ? 0 : 72,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(124,58,237,0.4) 0%, rgba(124,58,237,0.05) 60%, transparent 100%)",
          }}
        />
      </header>

      {/* Mobile slide-down nav menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "#0D0D14",
            borderBottom: "1px solid rgba(124,58,237,0.2)",
            zIndex: 29,
            position: "relative",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setMenuOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "12px 20px",
                  background: isActive ? "rgba(124,58,237,0.1)" : "none",
                  border: "none",
                  borderLeft: isActive ? "2px solid #7C3AED" : "2px solid transparent",
                  color: isActive ? "#F0F0FF" : "#6B6B8A",
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.1s",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
