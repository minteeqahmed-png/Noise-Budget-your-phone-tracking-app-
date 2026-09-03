import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ============================================================================
// NOISEBUDGET — Cognitive Load Monitor
// Theme: Professional Polish
// ============================================================================

export const TOKENS = {
  bg: "#0A0A0B",
  surface: "#111214",
  border: "rgba(255, 255, 255, 0.10)",
  borderSubtle: "rgba(255, 255, 255, 0.05)",
  textPrimary: "#F5F7F8",
  textMuted: "#7C8188",
  accentCalm: "#39FF88",     // Low (0-35)
  accentElevated: "#28B8FF", // Mid (36-69)
  accentDrifting: "#FF6B35", // High (70-84)
  accentCritical: "#FF3B30", // Critical (85-100)
};

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  badge: string;
  badgeType: "calm" | "mid" | "high" | "critical";
  icon: "switch" | "scroll" | "fragment";
}

// ----------------------------------------------------------------------------
// Vibration Feedback Protocol (Subtle Double-Pulse Threshold Alert)
// ----------------------------------------------------------------------------
export const triggerPhysicalVibrationProtocol = () => {
  // 1. Android Native Haptics Bridge (45ms pulse, 60ms pause, 45ms pulse)
  try {
    if (typeof window !== "undefined" && (window as any).AndroidHaptics?.triggerOverloadHaptic) {
      (window as any).AndroidHaptics.triggerOverloadHaptic();
    }
  } catch (err) {
    console.warn("AndroidHaptics error:", err);
  }

  // 2. Standard Web Vibration API Fallback
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([45, 60, 45]);
    }
  } catch (err) {
    console.warn("Navigator vibrate error:", err);
  }
};

// ----------------------------------------------------------------------------
// 1. <StatusBar />: Native Android Status Bar (Professional Polish)
// ----------------------------------------------------------------------------
export const StatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState("10:24");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
        userSelect: "none",
        zIndex: 50,
        width: "100%",
      }}
    >
      {/* Top Left: Clock */}
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: TOKENS.textPrimary,
        }}
      >
        {timeStr}
      </span>

      {/* Center: Hardware Camera Punch-Hole Cutout */}
      <div
        style={{
          width: 14,
          height: 14,
          backgroundColor: "#000000",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Top Right: Native Cluster (5G, Wi-Fi, Battery 78%) */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "-0.05em",
            color: TOKENS.textPrimary,
          }}
        >
          5G
        </span>

        {/* Native Wi-Fi Fan Icon */}
        <svg
          style={{ width: 15, height: 15, color: TOKENS.textPrimary }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21l-12-18h24z" />
        </svg>

        {/* Battery Cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 10, color: TOKENS.textPrimary }}>78%</span>
          <div
            style={{
              width: 10,
              height: 16,
              border: "1px solid rgba(255, 255, 255, 0.40)",
              borderRadius: 1,
              position: "relative",
              padding: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                height: "100%",
                width: "100%",
                borderRadius: 0.5,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -3,
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                height: 2,
                backgroundColor: "rgba(255, 255, 255, 0.40)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 2. <Header />: App Header with Polish Typography
// ----------------------------------------------------------------------------
export const Header: React.FC = () => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: `1px solid ${TOKENS.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: TOKENS.textPrimary,
            margin: 0,
          }}
        >
          NOISEBUDGET
        </h1>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: TOKENS.textMuted,
          }}
        >
          v2.4
        </span>
      </div>

      {/* Real-time System Monitoring Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          className="pulse-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: TOKENS.accentCalm,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: TOKENS.accentCalm,
            fontWeight: 500,
          }}
        >
          SYSTEM MONITORING
        </span>
      </div>
    </header>
  );
};

// ----------------------------------------------------------------------------
// 3. <BrainPulse noiseLevel={noiseLevel} />: Generative SVG Cognitive Field
// ----------------------------------------------------------------------------
interface NodeData {
  ring: number;
  baseAngle: number;
  speed: number;
  size: number;
}

export const BrainPulse: React.FC<{ noiseLevel: number }> = ({ noiseLevel }) => {
  const [frameTime, setFrameTime] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  const nodes = useMemo<NodeData[]>(() => {
    const list: NodeData[] = [];
    for (let i = 0; i < 4; i++) {
      list.push({ ring: 1, baseAngle: (i * Math.PI) / 2 + 0.2, speed: 0.8, size: 3 });
    }
    for (let i = 0; i < 6; i++) {
      list.push({ ring: 2, baseAngle: (i * Math.PI) / 3 + 0.1, speed: -0.6, size: 3.5 });
    }
    for (let i = 0; i < 8; i++) {
      list.push({ ring: 3, baseAngle: (i * Math.PI) / 4 + 0.4, speed: 0.45, size: 3 });
    }
    return list;
  }, []);

  useEffect(() => {
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReducedMotion) {
      setFrameTime(100);
      return;
    }

    let lastTimestamp = performance.now();
    const loop = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      const speedFactor = noiseLevel < 36 ? 0.9 : noiseLevel < 70 ? 2.0 : 4.5;
      setFrameTime((prev) => prev + delta * speedFactor);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [noiseLevel]);

  const isLow = noiseLevel <= 35;
  const isMid = noiseLevel > 35 && noiseLevel < 70;
  const isHigh = noiseLevel >= 70;

  const cx = 100;
  const cy = 100;

  const breathe = Math.sin(frameTime * 1.5) * (isLow ? 3.0 : isMid ? 4.5 : 1.5);
  const r1 = 40 + breathe;
  const r2 = 65 + breathe * 1.1;
  const r3 = 90 + breathe * 0.7;

  const computedNodes = nodes.map((node, index) => {
    const baseR = node.ring === 1 ? r1 : node.ring === 2 ? r2 : r3;
    let angle = node.baseAngle + frameTime * node.speed * 0.6;
    let radius = baseR;
    let jitterX = 0;
    let jitterY = 0;

    if (isMid) {
      radius += Math.sin(angle * 3 + frameTime * 2) * 4;
    } else if (isHigh) {
      jitterX = Math.sin(frameTime * 25 + index * 17) * 3.5;
      jitterY = Math.cos(frameTime * 28 + index * 23) * 3.5;
      radius += Math.sin(angle * 4 + frameTime * 5) * 6;
    }

    const x = cx + Math.cos(angle) * radius + jitterX;
    const y = cy + Math.sin(angle) * radius + jitterY;

    let color = TOKENS.accentCalm;
    if (isMid) {
      color = index % 2 === 0 ? TOKENS.accentElevated : TOKENS.accentDrifting;
    } else if (isHigh) {
      color = index % 3 === 0 ? TOKENS.accentCritical : TOKENS.accentDrifting;
    }

    return { x, y, size: node.size, color };
  });

  const connections: { x1: number; y1: number; x2: number; y2: number; color: string; opacity: number }[] = [];
  for (let i = 0; i < computedNodes.length; i++) {
    for (let j = i + 1; j < computedNodes.length; j++) {
      const n1 = computedNodes[i];
      const n2 = computedNodes[j];
      const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
      const maxDist = isLow ? 58 : isMid ? 50 : 42;
      if (dist < maxDist) {
        if (isHigh && ((i + j + Math.floor(frameTime * 12)) % 5 === 0)) continue;

        let strokeColor = TOKENS.accentCalm;
        let opacity = 0.35;
        if (isMid) {
          strokeColor = TOKENS.accentElevated;
          opacity = 0.38;
        } else if (isHigh) {
          strokeColor = (i + j) % 2 === 0 ? TOKENS.accentCritical : TOKENS.accentDrifting;
          opacity = 0.45;
        }

        connections.push({
          x1: n1.x,
          y1: n1.y,
          x2: n2.x,
          y2: n2.y,
          color: strokeColor,
          opacity: opacity * (1 - dist / maxDist),
        });
      }
    }
  }

  // Ring stroke parameters
  const ring1Stroke = isLow
    ? "rgba(57,255,136,0.3)"
    : isMid
    ? "rgba(40,184,255,0.3)"
    : "rgba(255,107,53,0.3)";
  const ring2Stroke = isLow
    ? "rgba(57,255,136,0.18)"
    : isMid
    ? "rgba(40,184,255,0.18)"
    : "rgba(255,107,53,0.15)";
  const ring3Stroke = isLow
    ? "rgba(57,255,136,0.08)"
    : isMid
    ? "rgba(40,184,255,0.08)"
    : "rgba(255,107,53,0.05)";

  return (
    <div
      style={{
        width: "100%",
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        className={isHigh ? "jitter" : ""}
        style={{ width: 220, height: 200, opacity: isHigh ? 0.75 : 0.9 }}
        viewBox="0 0 200 200"
      >
        {/* Orbital Rings */}
        <circle
          cx={cx}
          cy={cy}
          r={r1}
          fill="none"
          stroke={ring1Stroke}
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r2}
          fill="none"
          stroke={ring2Stroke}
          strokeWidth="1"
          strokeDasharray="10 5"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r3}
          fill="none"
          stroke={ring3Stroke}
          strokeWidth="1"
        />

        {/* Fractured Connector Lines */}
        {connections.map((c, idx) => (
          <line
            key={`conn-${idx}`}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke={c.color}
            strokeWidth="1"
            strokeOpacity={c.opacity}
            strokeDasharray={isHigh && idx % 3 === 0 ? "2 2" : "none"}
          />
        ))}

        {/* Center Nucleus */}
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill={isLow ? TOKENS.accentCalm : isMid ? TOKENS.accentElevated : TOKENS.accentDrifting}
          fillOpacity="0.2"
        />
        <circle
          cx={cx}
          cy={cy}
          r={2.5}
          fill={isLow ? TOKENS.accentCalm : isMid ? TOKENS.accentElevated : TOKENS.accentDrifting}
        />

        {/* Dynamic Nodes */}
        {computedNodes.map((n, idx) => (
          <circle
            key={`node-${idx}`}
            cx={n.x}
            cy={n.y}
            r={n.size}
            fill={n.color}
            className={idx % 4 === 0 ? "pulse-dot" : undefined}
          />
        ))}
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 4. <NoiseScore score={noiseLevel} />: Professional Polish Numeric & Budget Telemetry
// ----------------------------------------------------------------------------
export const NoiseScore: React.FC<{ score: number }> = ({ score }) => {
  let scoreColor = TOKENS.accentCalm;
  if (score > 35 && score < 70) {
    scoreColor = TOKENS.accentElevated;
  } else if (score >= 70 && score < 85) {
    scoreColor = TOKENS.accentDrifting;
  } else if (score >= 85) {
    scoreColor = TOKENS.accentDrifting; // #FF6B35 prominent in polish design
  }

  const budgetReserve = Math.max(4, Math.round(100 - score * 0.96));
  const burnRate = (Math.pow(score / 28, 1.45) + 0.6).toFixed(1);

  return (
    <div style={{ marginTop: 8 }}>
      {/* Primary Score Row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 60,
            fontWeight: 300,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: scoreColor,
            transition: "color 0.4s ease",
          }}
        >
          {score}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            fontWeight: 300,
            color: TOKENS.textMuted,
          }}
        >
          / 100
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: TOKENS.textMuted,
          marginTop: 4,
          marginBottom: 0,
        }}
      >
        COGNITIVE NOISE INDEX
      </p>

      {/* Budget Telemetry Strip */}
      <div
        style={{
          marginTop: 20,
          borderTop: `1px solid ${TOKENS.borderSubtle}`,
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: TOKENS.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
              margin: 0,
            }}
          >
            Budget Reserve
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 500,
              color: budgetReserve < 20 ? TOKENS.accentCritical : TOKENS.textPrimary,
              margin: 0,
              marginTop: 4,
            }}
          >
            {budgetReserve}%
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: TOKENS.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 4,
              margin: 0,
            }}
          >
            Burn Rate
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 500,
              color: score >= 70 ? TOKENS.accentCritical : TOKENS.accentElevated,
              margin: 0,
              marginTop: 4,
            }}
          >
            +{burnRate} <span style={{ fontSize: 12 }}>pts/min</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. <AnalyticsList data={metricsData} /> & <AnalyticsRow />
// ----------------------------------------------------------------------------
export const AnalyticsRow: React.FC<{ item: MetricItem }> = ({ item }) => {
  let badgeColor = TOKENS.accentCalm;
  if (item.badgeType === "mid") badgeColor = TOKENS.accentElevated;
  if (item.badgeType === "high") badgeColor = TOKENS.accentDrifting;
  if (item.badgeType === "critical") badgeColor = TOKENS.accentCritical;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: `1px solid ${TOKENS.borderSubtle}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Rounded Icon container */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: badgeColor,
          }}
        >
          {item.icon === "switch" && (
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 11V7l-5 5 5 5v-4h3a2 2 0 012 2v2H20v-2a2 2 0 012-2h3" strokeLinecap="round" />
            </svg>
          )}
          {item.icon === "scroll" && (
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" />
            </svg>
          )}
          {item.icon === "fragment" && (
            <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l7 5-3 5 8 6M15 4l5 6-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: TOKENS.textPrimary,
              margin: 0,
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: TOKENS.textMuted,
              margin: 0,
              marginTop: 1,
            }}
          >
            {item.badge}
          </p>
        </div>
      </div>

      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 500,
          color: badgeColor,
        }}
      >
        {item.value}
      </span>
    </div>
  );
};

export const AnalyticsList: React.FC<{ data: MetricItem[] }> = ({ data }) => {
  return (
    <div style={{ marginTop: 20, borderTop: `1px solid ${TOKENS.border}` }}>
      {data.map((item) => (
        <AnalyticsRow key={item.id} item={item} />
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. <InterventionCard />: Professional Polish High-Contrast Intervention Card
// ----------------------------------------------------------------------------
export const InterventionCard: React.FC<{
  active: boolean;
  onResetAttention: () => void;
}> = ({ active, onResetAttention }) => {
  const [isCounting, setIsCounting] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setIsCounting(false);
      setSecondsRemaining(10);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [active]);

  const handleStartCountdown = () => {
    if (isCounting) return;
    setIsCounting(true);
    setSecondsRemaining(10);

    const interval = window.setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCounting(false);
          onResetAttention();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    timerRef.current = interval;
  };

  if (!active) return null;

  const progressPercent = ((10 - secondsRemaining) / 10) * 100;

  return (
    <div style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 20, zIndex: 30 }}>
      <div
        style={{
          backgroundColor: "#FF6B35",
          borderRadius: 14,
          padding: 20,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.50)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          transition: "transform 0.15s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000000",
              margin: 0,
            }}
          >
            Dopamine Loop Detected
          </h2>
          <div
            style={{
              backgroundColor: "#000000",
              color: "#FF6B35",
              padding: "2px 6px",
              borderRadius: 4,
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            CRITICAL
          </div>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "rgba(0, 0, 0, 0.80)",
            lineHeight: 1.35,
            marginBottom: 10,
            margin: 0,
          }}
        >
          Screen muted to break fragmentation. Physical feedback intervention active.
        </p>

        {/* Tactile Feedback Status Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            padding: "3px 8px",
            borderRadius: 4,
            marginBottom: 10,
          }}
        >
          <svg style={{ width: 12, height: 12, color: "#000000" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5a9 9 0 010 14M7 5a9 9 0 000 14M21 8a13 13 0 010 8M3 8a13 13 0 000 8" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, color: "#000000", letterSpacing: "0.05em" }}>
            PHYSICAL FEEDBACK: TACTILE DOUBLE-PULSE FIRED
          </span>
        </div>

        {isCounting && (
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              height: 4,
              backgroundColor: "rgba(0, 0, 0, 0.20)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPercent}%`,
                backgroundColor: "#000000",
                transition: "width 1s linear",
              }}
            />
          </div>
        )}

        <button
          onClick={handleStartCountdown}
          disabled={isCounting}
          style={{
            width: "100%",
            backgroundColor: "#000000",
            color: "#F5F7F8",
            paddingTop: 12,
            paddingBottom: 12,
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            border: "none",
            cursor: isCounting ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 10,
          }}
        >
          <span>{isCounting ? `BREATHE DEEPLY & EXHALE (${secondsRemaining}s)...` : "Initiate 10s Reset Protocol"}</span>
          <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 7. <WeeklyCognitivePattern />: Weekly Cognitive Pattern & High-Stress Period Analysis
// ----------------------------------------------------------------------------
export interface DailyNoiseRecord {
  day: string;
  dayShort: string;
  date: string;
  avgNoise: number;
  peakNoise: number;
  switchesPerHour: number;
  status: "CALM" | "MODERATE" | "HIGH STRESS" | "CRITICAL";
  statusColor: string;
  timeWindow?: string;
  insight: string;
}

export const WEEKLY_DATA: DailyNoiseRecord[] = [
  {
    day: "Monday",
    dayShort: "MON",
    date: "Sep 01",
    avgNoise: 68,
    peakNoise: 72,
    switchesPerHour: 34,
    status: "MODERATE",
    statusColor: "#28B8FF",
    insight: "Morning backlog clearing with elevated context shifting.",
  },
  {
    day: "Tuesday",
    dayShort: "TUE",
    date: "Sep 02",
    avgNoise: 76,
    peakNoise: 88,
    switchesPerHour: 44,
    status: "HIGH STRESS",
    statusColor: "#FF6B35",
    timeWindow: "14:00 – 17:30",
    insight: "Multi-channel fragmentation spike. 6 consecutive sprint syncs.",
  },
  {
    day: "Wednesday",
    dayShort: "WED",
    date: "Sep 03",
    avgNoise: 84,
    peakNoise: 92,
    switchesPerHour: 51,
    status: "CRITICAL",
    statusColor: "#FF3B30",
    timeWindow: "13:30 – 19:00",
    insight: "Peak cognitive overload. Rapid dopamine loops & attention splintering.",
  },
  {
    day: "Thursday",
    dayShort: "THU",
    date: "Sep 04",
    avgNoise: 58,
    peakNoise: 66,
    switchesPerHour: 22,
    status: "MODERATE",
    statusColor: "#28B8FF",
    insight: "Post-intervention recovery. Focus shield engaged 3.2 hrs.",
  },
  {
    day: "Friday",
    dayShort: "FRI",
    date: "Sep 05",
    avgNoise: 44,
    peakNoise: 52,
    switchesPerHour: 14,
    status: "CALM",
    statusColor: "#39FF88",
    insight: "Declining cognitive friction. Sustained single-task focus flow.",
  },
  {
    day: "Saturday",
    dayShort: "SAT",
    date: "Sep 06",
    avgNoise: 26,
    peakNoise: 34,
    switchesPerHour: 6,
    status: "CALM",
    statusColor: "#39FF88",
    insight: "Digital detachment. Offline restorative activities.",
  },
  {
    day: "Sunday",
    dayShort: "SUN",
    date: "Sep 07",
    avgNoise: 22,
    peakNoise: 28,
    switchesPerHour: 4,
    status: "CALM",
    statusColor: "#39FF88",
    insight: "Optimal baseline. Cognitive budget fully replenished.",
  },
];

export const WeeklyCognitivePattern: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(2); // Default to Wednesday peak
  const selectedDay = WEEKLY_DATA[selectedDayIndex];

  // SVG Chart Geometry
  // 7 points across 330px width (x from 28 to 304, spacing = 46)
  const chartWidth = 330;
  const chartHeight = 160;
  const paddingLeft = 28;
  const xStep = 46;
  const yBottom = 135;
  const yRange = 115; // 0-100 maps to yBottom to yBottom - yRange (20)

  const getY = (val: number) => yBottom - (val / 100) * yRange;
  const getX = (idx: number) => paddingLeft + idx * xStep;

  // Path generator for line chart
  const points = WEEKLY_DATA.map((d, i) => ({ x: getX(i), y: getY(d.avgNoise) }));
  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  // Area under curve path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${yBottom} L ${points[0].x} ${yBottom} Z`;

  // 70 Threshold Y coordinate
  const thresholdY = getY(70);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Weekly Metric Summary Strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: 10,
          borderBottom: `1px solid ${TOKENS.borderSubtle}`,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 42,
                fontWeight: 300,
                letterSpacing: "-0.05em",
                color: "#28B8FF",
                lineHeight: 1,
              }}
            >
              54.6
            </span>
            <span style={{ fontSize: 18, color: TOKENS.textMuted, fontWeight: 300 }}>/ 100</span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: TOKENS.textMuted,
              marginTop: 4,
              margin: 0,
            }}
          >
            WEEKLY AVERAGE NOISE
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255, 107, 53, 0.15)",
              color: "#FF6B35",
              border: "1px solid rgba(255, 107, 53, 0.40)",
              padding: "3px 8px",
              borderRadius: 4,
              fontSize: 9,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            2 OVERLOAD DAYS
          </span>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: TOKENS.textMuted,
              marginTop: 4,
              margin: 0,
            }}
          >
            Threshold: 70.0 pts
          </p>
        </div>
      </div>

      {/* High-Stress Period Alert Callout */}
      <div
        style={{
          backgroundColor: "rgba(255, 107, 53, 0.08)",
          border: "1px solid rgba(255, 107, 53, 0.35)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 107, 53, 0.20)",
            color: "#FF6B35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF6B35",
                margin: 0,
              }}
            >
              High-Stress Period Identified
            </h3>
            <span
              style={{
                backgroundColor: "#FF3B30",
                color: "#FFFFFF",
                fontSize: 8,
                padding: "1px 4px",
                borderRadius: 2,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
              }}
            >
              PEAK
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(245, 247, 248, 0.85)",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            <strong style={{ color: "#F5F7F8" }}>Tue 14:00 – Wed 19:00</strong> exhibited acute task fragmentation. Peak noise reached <strong>84/100</strong> (+14 above threshold).
          </p>
        </div>
      </div>

      {/* Interactive Line Chart Canvas */}
      <div
        style={{
          backgroundColor: "#111214",
          border: `1px solid ${TOKENS.border}`,
          borderRadius: 12,
          padding: "12px 8px 8px 8px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 8,
            paddingRight: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.08em",
              color: TOKENS.textMuted,
              textTransform: "uppercase",
            }}
          >
            DAILY AVERAGE NOISE TRAJECTORY
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              color: "#FF6B35",
            }}
          >
            ● OVERLOAD ZONE (&gt;70)
          </span>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <defs>
            <linearGradient id="weeklyAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.40" />
              <stop offset="45%" stopColor="#FF6B35" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#28B8FF" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#39FF88" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineStrokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#28B8FF" />
              <stop offset="25%" stopColor="#FF6B35" />
              <stop offset="45%" stopColor="#FF3B30" />
              <stop offset="65%" stopColor="#28B8FF" />
              <stop offset="100%" stopColor="#39FF88" />
            </linearGradient>
          </defs>

          {/* Background Grid Lines & Y-axis Labels */}
          {[100, 75, 50, 25, 0].map((gridVal) => {
            const y = getY(gridVal);
            return (
              <g key={`grid-${gridVal}`}>
                <line
                  x1={20}
                  y1={y}
                  x2={310}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
                <text
                  x={15}
                  y={y + 3}
                  textAnchor="end"
                  fill="#7C8188"
                  fontSize="7"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {gridVal}
                </text>
              </g>
            );
          })}

          {/* 70% Overload Threshold Dashed Line */}
          <line
            x1={20}
            y1={thresholdY}
            x2={310}
            y2={thresholdY}
            stroke="#FF6B35"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            strokeOpacity="0.75"
          />
          <text
            x={310}
            y={thresholdY - 4}
            textAnchor="end"
            fill="#FF6B35"
            fontSize="7.5"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="bold"
          >
            70 THRESHOLD
          </text>

          {/* High-Stress Zone Shading (Tue to Wed) */}
          <rect
            x={getX(1) - 18}
            y={getY(100)}
            width={xStep + 36}
            height={yBottom - getY(100)}
            fill="rgba(255, 59, 48, 0.07)"
            rx="4"
          />

          {/* Area under curve */}
          <path d={areaD} fill="url(#weeklyAreaGradient)" />

          {/* Multi-point Stroke Path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineStrokeGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Nodes for each day */}
          {WEEKLY_DATA.map((d, i) => {
            const x = getX(i);
            const y = getY(d.avgNoise);
            const isSelected = selectedDayIndex === i;
            const isOverload = d.avgNoise >= 70;

            return (
              <g
                key={`point-${d.dayShort}`}
                onClick={() => setSelectedDayIndex(i)}
                style={{ cursor: "pointer" }}
              >
                {/* Active/Peak Pulsing Ring */}
                {(isSelected || d.avgNoise === 84) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 9 : 7}
                    fill="none"
                    stroke={d.statusColor}
                    strokeWidth="1.5"
                    strokeOpacity={isSelected ? 0.9 : 0.6}
                    className="pulse-dot"
                  />
                )}

                {/* Node Core */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 4.5 : isOverload ? 3.5 : 3}
                  fill={d.statusColor}
                  stroke="#111214"
                  strokeWidth="1.5"
                />

                {/* Value Label above node */}
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fill={isOverload ? d.statusColor : "#F5F7F8"}
                  fontSize={isSelected ? "9" : "8"}
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isSelected || isOverload ? "bold" : "normal"}
                >
                  {d.avgNoise}
                </text>

                {/* X-axis Day Label */}
                <text
                  x={x}
                  y={yBottom + 14}
                  textAnchor="middle"
                  fill={isSelected ? TOKENS.textPrimary : isOverload ? "#FF6B35" : TOKENS.textMuted}
                  fontSize="8.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isSelected || isOverload ? "bold" : "500"}
                >
                  {d.dayShort}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Day Inspect Ribbon */}
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: 8,
            border: `1px solid ${selectedDay.avgNoise >= 70 ? "rgba(255, 107, 53, 0.3)" : "rgba(255, 255, 255, 0.06)"}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: TOKENS.textPrimary }}>
                {selectedDay.day} ({selectedDay.date})
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  color: selectedDay.statusColor,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  padding: "1px 5px",
                  borderRadius: 3,
                }}
              >
                {selectedDay.status}
              </span>
            </div>
            <p style={{ fontSize: 10, color: TOKENS.textMuted, margin: "2px 0 0 0" }}>
              {selectedDay.insight}
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 700,
                color: selectedDay.statusColor,
              }}
            >
              {selectedDay.avgNoise} pts
            </span>
            <p style={{ fontSize: 8, color: TOKENS.textMuted, margin: "1px 0 0 0" }}>
              Peak: {selectedDay.peakNoise} | {selectedDay.switchesPerHour} sw/hr
            </p>
          </div>
        </div>
      </div>

      {/* Daily Breakdown List */}
      <div>
        <h4
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: TOKENS.textMuted,
            marginBottom: 8,
            margin: "0 0 8px 2px",
          }}
        >
          DAILY COGNITIVE LOAD BREAKDOWN
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {WEEKLY_DATA.map((item, idx) => {
            const isPeak = item.avgNoise >= 70;
            const isSelected = selectedDayIndex === idx;

            return (
              <div
                key={`row-${item.day}`}
                onClick={() => setSelectedDayIndex(idx)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: isSelected
                    ? "rgba(255, 255, 255, 0.07)"
                    : "rgba(255, 255, 255, 0.02)",
                  border: isSelected
                    ? `1px solid ${item.statusColor}`
                    : `1px solid ${TOKENS.borderSubtle}`,
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      color: isPeak ? item.statusColor : TOKENS.textPrimary,
                      width: 32,
                    }}
                  >
                    {item.dayShort}
                  </span>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: TOKENS.textPrimary }}>
                      {item.day}
                    </span>
                    <span style={{ fontSize: 9, color: TOKENS.textMuted, marginLeft: 6 }}>
                      {item.date}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 8,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      color: item.statusColor,
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      padding: "2px 5px",
                      borderRadius: 3,
                    }}
                  >
                    {item.status}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      color: item.statusColor,
                      width: 28,
                      textAlign: "right",
                    }}
                  >
                    {item.avgNoise}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 8. <ControlsBar />: Professional Polish Simulation Toolbar
// ----------------------------------------------------------------------------
export const ControlsBar: React.FC<{
  currentLevel: number;
  onSetLevel: (lvl: number) => void;
  focusShield: boolean;
  onToggleShield: () => void;
  mutedOverride: boolean;
  onToggleMute: () => void;
}> = ({
  currentLevel,
  onSetLevel,
  focusShield,
  onToggleShield,
  mutedOverride,
  onToggleMute,
}) => {
  return (
    <footer
      style={{
        flexShrink: 0,
        backgroundColor: "#111214",
        borderTop: `1px solid ${TOKENS.borderSubtle}`,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 16,
        userSelect: "none",
      }}
    >
      {/* Preset Buttons */}
      <div style={{ display: "flex", gap: 8, paddingBottom: 12 }}>
        <button
          onClick={() => onSetLevel(22)}
          style={{
            flex: 1,
            minWidth: 80,
            backgroundColor: currentLevel === 22 ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.05)",
            border: currentLevel === 22 ? `1px solid rgba(57, 255, 136, 0.60)` : `1px solid ${TOKENS.border}`,
            boxShadow: currentLevel === 22 ? "0 0 0 1px rgba(57, 255, 136, 0.30)" : "none",
            borderRadius: 6,
            padding: "8px 12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              fontSize: 8,
              color: TOKENS.textMuted,
              textTransform: "uppercase",
              marginBottom: 4,
              margin: 0,
            }}
          >
            Low
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              color: TOKENS.accentCalm,
              margin: 0,
            }}
          >
            22
          </p>
        </button>

        <button
          onClick={() => onSetLevel(52)}
          style={{
            flex: 1,
            minWidth: 80,
            backgroundColor: currentLevel === 52 ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.05)",
            border: currentLevel === 52 ? `1px solid rgba(40, 184, 255, 0.60)` : `1px solid ${TOKENS.border}`,
            boxShadow: currentLevel === 52 ? "0 0 0 1px rgba(40, 184, 255, 0.30)" : "none",
            borderRadius: 6,
            padding: "8px 12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              fontSize: 8,
              color: TOKENS.textMuted,
              textTransform: "uppercase",
              marginBottom: 4,
              margin: 0,
            }}
          >
            Mid
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              color: TOKENS.accentElevated,
              margin: 0,
            }}
          >
            52
          </p>
        </button>

        <button
          onClick={() => onSetLevel(85)}
          style={{
            flex: 1,
            minWidth: 80,
            backgroundColor: currentLevel === 85 ? "rgba(255, 255, 255, 0.10)" : "rgba(255, 255, 255, 0.05)",
            border: currentLevel === 85 ? "1px solid rgba(255, 107, 53, 0.60)" : `1px solid ${TOKENS.border}`,
            boxShadow: currentLevel === 85 ? "0 0 0 1px rgba(255, 107, 53, 0.30)" : "none",
            borderRadius: 6,
            padding: "8px 12px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              fontSize: 8,
              color: TOKENS.textMuted,
              textTransform: "uppercase",
              marginBottom: 4,
              margin: 0,
            }}
          >
            High
          </p>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              color: TOKENS.accentDrifting,
              margin: 0,
            }}
          >
            85
          </p>
        </button>
      </div>

      {/* System Status Indicators & Toggles */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: TOKENS.textMuted,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <div
          onClick={onToggleShield}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: focusShield ? TOKENS.accentCalm : TOKENS.accentDrifting,
            }}
          />
          <span>FOCUS SHIELD: {focusShield ? "ON" : "OFF"}</span>
        </div>

        <div
          onClick={onToggleMute}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <div
            className={currentLevel >= 70 ? "jitter" : undefined}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: currentLevel >= 70 ? TOKENS.accentCritical : TOKENS.accentCalm,
            }}
          />
          <span>NEURAL SENSOR: {mutedOverride ? "MANUAL" : currentLevel >= 70 ? "ALRT" : "NORM"}</span>
        </div>
      </div>
    </footer>
  );
};

// ----------------------------------------------------------------------------
// 9. <GestureIndicator />: Android Standard Navigation Bar Pill
// ----------------------------------------------------------------------------
export const GestureIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 14,
        width: "100%",
        paddingBottom: 4,
        backgroundColor: "#111214",
      }}
    >
      <div
        style={{
          width: 72,
          height: 4,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.20)",
        }}
      />
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT: NoiseBudgetApp
// ============================================================================
export default function NoiseBudgetApp() {
  const [activeView, setActiveView] = useState<"live" | "weekly">("live");
  const [noiseLevel, setNoiseLevel] = useState<number>(85);
  const [focusShield, setFocusShield] = useState<boolean>(true);
  const [mutedOverride, setMutedOverride] = useState<boolean>(false);
  const [isHapticRumbling, setIsHapticRumbling] = useState<boolean>(false);
  const prevNoiseRef = useRef<number>(85);

  // Vibration feedback protocol: triggers when cognitive load crosses the 70% threshold
  useEffect(() => {
    if (prevNoiseRef.current < 70 && noiseLevel >= 70) {
      triggerPhysicalVibrationProtocol();
      setIsHapticRumbling(true);
      const timer = setTimeout(() => setIsHapticRumbling(false), 450);
      return () => clearTimeout(timer);
    }
    prevNoiseRef.current = noiseLevel;
  }, [noiseLevel]);

  const metricsData = useMemo<MetricItem[]>(() => {
    if (noiseLevel >= 70) {
      return [
        {
          id: "m1",
          label: "Switching Velocity",
          value: "42 sw/hr",
          badge: "High fragmentation",
          badgeType: "high",
          icon: "switch",
        },
        {
          id: "m2",
          label: "Scroll Speed",
          value: "18 sc/min",
          badge: "Chaotic trajectory",
          badgeType: "critical",
          icon: "scroll",
        },
        {
          id: "m3",
          label: "Attention Fragmentation",
          value: "Extreme",
          badge: "Red Zone",
          badgeType: "critical",
          icon: "fragment",
        },
      ];
    } else if (noiseLevel >= 36) {
      return [
        {
          id: "m1",
          label: "Switching Velocity",
          value: "18 sw/hr",
          badge: "Moderate velocity",
          badgeType: "mid",
          icon: "switch",
        },
        {
          id: "m2",
          label: "Scroll Speed",
          value: "7 sc/min",
          badge: "Elevated pace",
          badgeType: "mid",
          icon: "scroll",
        },
        {
          id: "m3",
          label: "Attention Fragmentation",
          value: "Fragmented",
          badge: "Warning Zone",
          badgeType: "high",
          icon: "fragment",
        },
      ];
    } else {
      return [
        {
          id: "m1",
          label: "Switching Velocity",
          value: "6 sw/hr",
          badge: "Nominal pace",
          badgeType: "calm",
          icon: "switch",
        },
        {
          id: "m2",
          label: "Scroll Speed",
          value: "2 sc/min",
          badge: "Deliberate focus",
          badgeType: "calm",
          icon: "scroll",
        },
        {
          id: "m3",
          label: "Attention Fragmentation",
          value: "Coherent",
          badge: "Stable Zone",
          badgeType: "calm",
          icon: "fragment",
        },
      ];
    }
  }, [noiseLevel]);

  const isScreenMuted = noiseLevel >= 70;

  const handleResetAttention = useCallback(() => {
    setNoiseLevel(22);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#050506",
        padding: "16px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .pulse-dot {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .jitter {
          animation: jitter 0.2s infinite;
        }
        @keyframes jitter {
          0% { transform: translate(0,0); }
          25% { transform: translate(1px,-1px); }
          50% { transform: translate(-1px,1px); }
          75% { transform: translate(1px,1px); }
          100% { transform: translate(0,0); }
        }
        @keyframes hapticRumble {
          0% { transform: translate(0, 0); }
          15% { transform: translate(-2px, 1.5px); }
          30% { transform: translate(2px, -1.5px); }
          45% { transform: translate(-1.5px, -1px); }
          60% { transform: translate(1.5px, 1px); }
          75% { transform: translate(-1px, 0.5px); }
          100% { transform: translate(0, 0); }
        }
        .haptic-rumble {
          animation: hapticRumble 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
      `}</style>

      {/* Emulated Android Chassis (390px x 844px) */}
      <div
        className={isHapticRumbling ? "haptic-rumble" : undefined}
        style={{
          width: "100%",
          maxWidth: 390,
          minHeight: 844,
          maxHeight: "96vh",
          backgroundColor: TOKENS.bg,
          borderRadius: 44,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow:
            "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 0 1.5px rgba(255, 255, 255, 0.10)",
        }}
      >
        <StatusBar />

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* FILTERED TELEMETRY GROUP: gains grayscale/dimming in high noise */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 16,
              overflowY: "auto",
              filter: isScreenMuted ? "grayscale(100%) brightness(0.5) contrast(75%)" : "none",
              WebkitFilter: isScreenMuted ? "grayscale(100%) brightness(0.5) contrast(75%)" : "none",
              transition: "filter 0.5s ease",
            }}
          >
            <Header />

            {/* View Switcher: Live Telemetry vs Weekly Cognitive Pattern */}
            <div
              style={{
                display: "flex",
                gap: 4,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                padding: 3,
                borderRadius: 8,
                border: `1px solid ${TOKENS.borderSubtle}`,
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              <button
                onClick={() => setActiveView("live")}
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: activeView === "live" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  color: activeView === "live" ? TOKENS.textPrimary : TOKENS.textMuted,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                LIVE TELEMETRY
              </button>
              <button
                onClick={() => setActiveView("weekly")}
                style={{
                  flex: 1,
                  padding: "6px 10px",
                  fontSize: 10,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor: activeView === "weekly" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  color: activeView === "weekly" ? TOKENS.textPrimary : TOKENS.textMuted,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                WEEKLY PATTERN
              </button>
            </div>

            {activeView === "live" ? (
              <>
                <BrainPulse noiseLevel={noiseLevel} />
                <NoiseScore score={noiseLevel} />
                <AnalyticsList data={metricsData} />
              </>
            ) : (
              <WeeklyCognitivePattern />
            )}
          </div>

          {/* INTERVENTION CARD (ACTIVE OVERLAY - OUTSIDE FILTER) */}
          <InterventionCard
            active={isScreenMuted}
            onResetAttention={handleResetAttention}
          />
        </main>

        <ControlsBar
          currentLevel={noiseLevel}
          onSetLevel={setNoiseLevel}
          focusShield={focusShield}
          onToggleShield={() => setFocusShield((p) => !p)}
          mutedOverride={mutedOverride}
          onToggleMute={() => setMutedOverride((p) => !p)}
        />

        <GestureIndicator />
      </div>
    </div>
  );
}
