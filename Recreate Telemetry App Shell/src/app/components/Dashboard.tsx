import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, ChevronDown, Cpu, ExternalLink } from "lucide-react";
import { useIsMobile } from "../hooks/useIsMobile";

// ─── Data ──────────────────────────────────────────────────────────
const throughputData = [
  { time: "00:00", value: 24000, baseline: 18000 },
  { time: "02:00", value: 18000, baseline: 17500 },
  { time: "04:00", value: 22000, baseline: 18500 },
  { time: "06:00", value: 34000, baseline: 19000 },
  { time: "08:00", value: 52000, baseline: 20000 },
  { time: "10:00", value: 61000, baseline: 21000 },
  { time: "12:00", value: 47000, baseline: 20500 },
  { time: "14:00", value: 55000, baseline: 21500 },
  { time: "16:00", value: 68000, baseline: 22000 },
  { time: "18:00", value: 72000, baseline: 22500 },
  { time: "20:00", value: 58000, baseline: 21000 },
  { time: "22:00", value: 44000, baseline: 20000 },
];

// Fewer X-axis ticks on mobile
const throughputMobile = throughputData.filter((_, i) => i % 3 === 0);

const threatData = [
  { name: "Normal Processes", value: 61, color: "#7C3AED" },
  { name: "Suspicious", value: 22, color: "#A855F7" },
  { name: "Ghost Shadows", value: 17, color: "#2D1B4E" },
];

const recentThreats = [
  {
    id: "TH-2291",
    label: "CRITICAL",
    title: "Anomalous data exfiltration detected — Node 14",
    time: "2m ago",
    color: "#FF4D6D",
  },
  {
    id: "TH-2289",
    label: "HIGH",
    title: "Privilege escalation attempt from service account",
    time: "11m ago",
    color: "#FACC15",
  },
  {
    id: "TH-2287",
    label: "HIGH",
    title: "DNS tunneling pattern identified — subnet 10.4.x",
    time: "34m ago",
    color: "#FACC15",
  },
  {
    id: "TH-2284",
    label: "MED",
    title: "Repeated failed auth from IP 45.152.18.201",
    time: "1h ago",
    color: "#7C3AED",
  },
];

const computeData = [
  { label: "Jan", actual: 44, projected: 50 },
  { label: "Feb", actual: 52, projected: 58 },
  { label: "Mar", actual: 48, projected: 55 },
  { label: "Apr", actual: 61, projected: 68 },
  { label: "May", actual: 55, projected: 63 },
  { label: "Jun", actual: 70, projected: 78 },
  { label: "Jul", actual: 68, projected: 76 },
  { label: "Aug", actual: 74, projected: 82 },
  { label: "Sep", actual: null, projected: 88 },
  { label: "Oct", actual: null, projected: 91 },
  { label: "Nov", actual: null, projected: 94 },
  { label: "Dec", actual: null, projected: 97 },
];

// ─── Card Wrapper ──────────────────────────────────────────────────
function Card({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#12121C",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.05)",
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        color: "#6B6B8A",
        fontSize: 10,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 14,
      }}
    >
      {children}
    </p>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1A1A2E",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 10,
          padding: "6px 10px",
          fontSize: 11,
          color: "#C4C4E0",
        }}
      >
        <p style={{ color: "#7C7C9A", marginBottom: 3 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : "--"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Throughput Card ───────────────────────────────────────────────
function ThroughputCard({ isMobile }: { isMobile: boolean }) {
  return (
    <Card>
      <SectionLabel>AI Telemetry Throughput</SectionLabel>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 10 : 0,
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: isMobile ? 24 : 28, fontWeight: 600, color: "#F0F0FF", letterSpacing: "-0.02em" }}>
              68,291
              <span style={{ fontSize: 13, color: "#6B6B8A", marginLeft: 4 }}>eps</span>
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(34,211,165,0.12)",
                color: "#22D3A5",
                borderRadius: 7,
                padding: "2px 7px",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              <TrendingUp size={11} />
              +28.4%
            </div>
          </div>
          <p style={{ color: "#6B6B8A", fontSize: 11, marginTop: 3 }}>vs. 7-day rolling avg</p>
        </div>

        {/* Legend + filter — hidden on mobile to save space */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "#7C3AED", display: "inline-block" }} />
              <span style={{ color: "#6B6B8A", fontSize: 11 }}>Throughput</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "#2D1B4E", border: "1px solid #7C3AED44", display: "inline-block" }} />
              <span style={{ color: "#6B6B8A", fontSize: 11 }}>Baseline</span>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 7,
                padding: "3px 9px",
                color: "#9090B0",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              Today <ChevronDown size={11} />
            </button>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={isMobile ? 130 : 155}>
        <AreaChart
          data={isMobile ? throughputMobile : throughputData}
          margin={{ top: 4, right: 0, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="throughputGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D1B4E" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#2D1B4E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis dataKey="time" tick={{ fill: "#4A4A6A", fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#4A4A6A", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="baseline"
            name="Baseline"
            stroke="#4A2080"
            strokeWidth={1.5}
            fill="url(#baselineGrad)"
            strokeDasharray="4 3"
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Throughput"
            stroke="#7C3AED"
            strokeWidth={2}
            fill="url(#throughputGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#7C3AED", stroke: "#A78BFA", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Mobile-only compact legend */}
      {isMobile && (
        <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: "#7C3AED", display: "inline-block" }} />
            <span style={{ color: "#6B6B8A", fontSize: 10 }}>Throughput</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: "#2D1B4E", border: "1px solid #7C3AED44", display: "inline-block" }} />
            <span style={{ color: "#6B6B8A", fontSize: 10 }}>Baseline</span>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── Threat Signals Card ───────────────────────────────────────────
function ThreatSignalsCard({ isMobile }: { isMobile: boolean }) {
  return (
    <Card>
      <SectionLabel>Active Threat Signals</SectionLabel>
      <p style={{ color: "#9090B0", fontSize: 11, marginBottom: 16, lineHeight: 1.4 }}>
        Real-time classification across all monitored endpoints
      </p>

      {/* On mobile, lay out donut + legend side-by-side to save vertical space */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: "center",
          gap: isMobile ? 16 : 0,
        }}
      >
        <div style={{ position: "relative", flexShrink: 0 }}>
          <ResponsiveContainer width={isMobile ? 130 : 180} height={isMobile ? 130 : 180}>
            <PieChart>
              <Pie
                data={threatData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 36 : 54}
                outerRadius={isMobile ? 58 : 82}
                startAngle={90}
                endAngle={-270}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {threatData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: isMobile ? 22 : 32, fontWeight: 700, color: "#F0F0FF", lineHeight: 1 }}>27</p>
            <p style={{ fontSize: 9, color: "#6B6B8A", marginTop: 2 }}>ACTIVE</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, width: isMobile ? undefined : "100%", marginTop: isMobile ? 0 : 16 }}>
          {threatData.map((item) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 2,
                    background: item.color,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#9090B0", fontSize: 11 }}>{item.name}</span>
              </div>
              <span style={{ color: "#C4C4E0", fontSize: 11, fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Recent Threats Card ───────────────────────────────────────────
function RecentThreatsCard() {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <SectionLabel>Recent Threat Activity</SectionLabel>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            color: "#7C3AED",
            fontSize: 11,
            cursor: "pointer",
            fontWeight: 500,
            marginTop: -14,
          }}
        >
          View all <ExternalLink size={10} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {recentThreats.map((threat, i) => (
          <div
            key={threat.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              paddingTop: 10,
              paddingBottom: 10,
              borderBottom: i < recentThreats.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${threat.color}18`,
                color: threat.color,
                borderRadius: 5,
                fontSize: 8,
                fontWeight: 700,
                padding: "3px 5px",
                flexShrink: 0,
                letterSpacing: "0.05em",
                border: `1px solid ${threat.color}30`,
                marginTop: 1,
                minWidth: 38,
              }}
            >
              {threat.label}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "#C4C4E0",
                  fontSize: 12,
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {threat.title}
              </p>
              <p style={{ color: "#4A4A6A", fontSize: 10, marginTop: 2 }}>
                {threat.id} · {threat.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Compute Load Card ─────────────────────────────────────────────
function ComputeLoadCard({ isMobile }: { isMobile: boolean }) {
  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 10 : 0,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Cpu size={15} color="#A78BFA" />
          </div>
          <div>
            <p style={{ color: "#F0F0FF", fontSize: 13, fontWeight: 500 }}>AI Compute Load Projection</p>
            <p style={{ color: "#6B6B8A", fontSize: 11, marginTop: 2 }}>
              Projected workload vs. real compute
            </p>
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: 7,
            padding: "3px 9px",
            color: "#A78BFA",
            fontSize: 10,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#7C3AED",
              display: "inline-block",
              boxShadow: "0 0 6px #7C3AED",
            }}
          />
          LIVE FORECAST
        </div>
      </div>

      <ResponsiveContainer width="100%" height={isMobile ? 130 : 155}>
        <BarChart
          data={isMobile ? computeData.slice(0, 8) : computeData}
          barGap={3}
          margin={{ top: 4, right: 0, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4F1DB3" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#4A4A6A", fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#4A4A6A", fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip cursor={{ fill: "rgba(124,58,237,0.05)" }} content={<CustomTooltip />} />
          <Bar dataKey="actual" name="Actual" fill="url(#actualGrad)" radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="projected" name="Projected" fill="url(#projectedGrad)" radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 3, background: "#7C3AED", display: "inline-block" }} />
          <span style={{ color: "#6B6B8A", fontSize: 10 }}>Actual</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 3, background: "rgba(167,139,250,0.3)", border: "1px solid rgba(167,139,250,0.4)", display: "inline-block" }} />
          <span style={{ color: "#6B6B8A", fontSize: 10 }}>Projected</span>
        </div>
      </div>
    </Card>
  );
}

// ─── Status Bar ────────────────────────────────────────────────────
function StatusBar({ isMobile }: { isMobile: boolean }) {
  const nodes = [
    { label: "Ingest nodes", value: "24 / 24", status: "ok" },
    { label: "Processing lag", value: "14ms", status: "ok" },
    { label: "Error rate", value: "0.003%", status: "ok" },
    { label: "Data freshness", value: "< 2s", status: "ok" },
    { label: "Alert queue", value: "3 pending", status: "warn" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : 28,
        marginBottom: 20,
        overflowX: isMobile ? "auto" : "visible",
        WebkitOverflowScrolling: "touch" as any,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        // On mobile, add some negative margin to allow full-bleed scroll feel
        marginLeft: isMobile ? -20 : 0,
        marginRight: isMobile ? -20 : 0,
        paddingLeft: isMobile ? 20 : 0,
        paddingRight: isMobile ? 20 : 0,
      }}
    >
      {nodes.map((n, i) => (
        <div
          key={n.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            flexShrink: 0,
            paddingRight: isMobile ? 20 : 0,
          }}
        >
          {/* Dot */}
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: n.status === "ok" ? "#22D3A5" : "#FACC15",
              boxShadow: n.status === "ok" ? "0 0 5px #22D3A5" : "0 0 5px #FACC15",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#6B6B8A", fontSize: 11, whiteSpace: "nowrap" }}>{n.label}</span>
          <span style={{ color: "#C4C4E0", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap" }}>{n.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────
export function Dashboard() {
  const isMobile = useIsMobile();
  const pad = isMobile ? 16 : 28;

  return (
    <main
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        background: "#0A0A12",
        paddingTop: pad,
        paddingLeft: pad,
        paddingRight: pad,
        // Bottom padding accounts for mobile bottom nav (64px) + normal spacing
        paddingBottom: isMobile ? 80 : pad,
        WebkitOverflowScrolling: "touch" as any,
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              color: "#F0F0FF",
              fontSize: isMobile ? 16 : 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            System Overview
          </h1>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(34,211,165,0.1)",
              color: "#22D3A5",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.05em",
              border: "1px solid rgba(34,211,165,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22D3A5",
                display: "inline-block",
                boxShadow: "0 0 5px #22D3A5",
              }}
            />
            ALL SYSTEMS NOMINAL
          </span>
        </div>
        <p style={{ color: "#4A4A6A", fontSize: 11 }}>
          Last synced 23 seconds ago · March 22, 2026
        </p>
      </div>

      {/* Status bar */}
      <StatusBar isMobile={isMobile} />

      {/* Card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: isMobile ? 16 : 20,
        }}
      >
        {/* Throughput — 2 cols on desktop, full width on mobile */}
        <div style={{ gridColumn: isMobile ? "1" : "span 2" }}>
          <ThroughputCard isMobile={isMobile} />
        </div>

        {/* Threat Signals */}
        <ThreatSignalsCard isMobile={isMobile} />

        {/* Recent Threats */}
        <RecentThreatsCard />

        {/* Compute — 2 cols on desktop, full width on mobile */}
        <div style={{ gridColumn: isMobile ? "1" : "span 2" }}>
          <ComputeLoadCard isMobile={isMobile} />
        </div>
      </div>
    </main>
  );
}
