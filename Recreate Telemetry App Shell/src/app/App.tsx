import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { BottomNav } from "./components/BottomNav";
import { useIsMobile } from "./hooks/useIsMobile";

export default function App() {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "#0A0A12",
        overflow: "hidden",
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top navigation */}
      <TopNav />

      {/* Body: sidebar + main content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar: auto-hides on mobile via internal check */}
        <Sidebar />
        <Dashboard />
      </div>

      {/* Bottom nav: mobile only */}
      {isMobile && <BottomNav />}
    </div>
  );
}
