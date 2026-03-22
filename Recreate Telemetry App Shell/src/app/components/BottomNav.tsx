import { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  Shield,
  AlertTriangle,
  Settings,
} from "lucide-react";

const ITEMS = [
  { icon: LayoutDashboard, id: "dashboard", label: "Overview" },
  { icon: Activity, id: "activity", label: "Activity" },
  { icon: Shield, id: "shield", label: "Threats" },
  { icon: AlertTriangle, id: "alerts", label: "Alerts", badge: 3 },
  { icon: Settings, id: "settings", label: "Settings" },
];

export function BottomNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: "#0D0D14",
        borderTop: "1px solid rgba(124,58,237,0.18)",
        display: "flex",
        alignItems: "stretch",
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isActive ? "#A78BFA" : "#4A4A6A",
              position: "relative",
              transition: "color 0.15s",
            }}
          >
            {/* Active underline at top */}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: "20%",
                  right: "20%",
                  height: 2,
                  background: "#7C3AED",
                  borderRadius: "0 0 3px 3px",
                  boxShadow: "0 0 8px #7C3AED",
                }}
              />
            )}
            <div style={{ position: "relative" }}>
              <Icon size={20} strokeWidth={isActive ? 2 : 1.7} />
              {item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -6,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#7C3AED",
                    color: "#fff",
                    fontSize: 8,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid #0D0D14",
                    boxShadow: "0 0 6px #7C3AED88",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 9,
                fontWeight: isActive ? 600 : 400,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
