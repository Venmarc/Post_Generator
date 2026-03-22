import { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  Shield,
  GitBranch,
  Database,
  AlertTriangle,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

const TOP_ITEMS = [
  { icon: LayoutDashboard, id: "dashboard", label: "Dashboard" },
  { icon: Activity, id: "activity", label: "Activity" },
  { icon: Shield, id: "shield", label: "Threats" },
  { icon: GitBranch, id: "pipeline", label: "Pipelines" },
  { icon: Database, id: "data", label: "Data" },
  { icon: AlertTriangle, id: "alerts", label: "Alerts", badge: 3 },
  { icon: BarChart3, id: "analytics", label: "Analytics" },
];

const BOTTOM_ITEMS = [
  { icon: Settings, id: "settings", label: "Settings" },
  { icon: HelpCircle, id: "help", label: "Help" },
];

function SidebarIcon({
  icon: Icon,
  isActive,
  badge,
  label,
  onClick,
}: {
  icon: React.ElementType;
  isActive: boolean;
  badge?: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <div style={{ position: "relative" }} title={label}>
      <button
        onClick={onClick}
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: isActive ? "rgba(124,58,237,0.2)" : "transparent",
          border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
          color: isActive ? "#A78BFA" : "#4A4A6A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.15s",
          boxShadow: isActive ? "0 0 12px rgba(124,58,237,0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "#9090B0";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#4A4A6A";
          }
        }}
      >
        <Icon size={17} strokeWidth={1.7} />
      </button>
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 4,
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
          {badge}
        </span>
      )}
    </div>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const isMobile = useIsMobile();

  // Hidden on mobile — BottomNav handles navigation instead
  if (isMobile) return null;

  return (
    <aside
      style={{
        width: 72,
        background: "#0D0D14",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 16,
        gap: 0,
        flexShrink: 0,
      }}
    >
      {/* Top icons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {TOP_ITEMS.map((item) => (
          <SidebarIcon
            key={item.id}
            icon={item.icon}
            isActive={active === item.id}
            badge={item.badge}
            label={item.label}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 32,
          height: 1,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 8,
        }}
      />

      {/* Bottom icons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {BOTTOM_ITEMS.map((item) => (
          <SidebarIcon
            key={item.id}
            icon={item.icon}
            isActive={active === item.id}
            label={item.label}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>
    </aside>
  );
}
