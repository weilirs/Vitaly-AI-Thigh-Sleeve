import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const App: React.FC = () => {
  const [apiData, setApiData] = useState<null | {
  session_id: string;
  timestamp: string;
  muscle_activation: number;
  muscle_fatigue: number;
  force: number;
  velocity: number;
  power_output: number;
}>(null);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [aiMessages, setAiMessages] = useState<
    Array<{ type: "user" | "ai"; message: string }>
  >([
    {
      type: "ai",
      message:
        "Hi! I'm Fitty, your AI fitness coach! 😺 How can I help you today?",
    },
  ]);
  const [emgData, setEmgData] = useState<number[]>([]);

  // Just a small helper for box shadows, used a lot in Tailwind "shadow-sm"
  const boxShadowSm = "0 1px 2px rgba(0,0,0,0.05)";

  // Some color variables for quick reference
  const colorGray50 = "#F9FAFB";
  const colorGray100 = "#F3F4F6";
  const colorGray200 = "#E5E7EB";
  const colorGray400 = "#9CA3AF";
  const colorGray500 = "#6B7280";
  const colorGray600 = "#4B5563";
  const colorGray700 = "#374151";
  const colorGray800 = "#1F2937";
  const colorGray900 = "#111827";
  const colorWhite = "#FFFFFF";
  const colorBlue50 = "#EFF6FF";
  const colorBlue100 = "#DBEAFE";
  const colorBlue500 = "#3B82F6";
  const colorBlue600 = "#2563EB";
  const colorBlue400 = "#60A5FA";
  const colorGreen50 = "#ECFDF5";
  const colorGreen500 = "#10B981";
  const colorOrange50 = "#FFF7ED";
  const colorOrange400 = "#FB923C";
  const colorPurple500 = "#A855F7";

  // Simulate real-time EMG data
  useEffect(() => {
    const interval = setInterval(() => {
      setEmgData((prev) => [...prev.slice(-19), Math.random() * 100]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/latest");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("✅ Fetched API Data:", data);
        setApiData(data); // 存到你已经声明的 apiData 状态中
      } catch (err) {
        console.error("❌ API fetch error:", err);
      }
    };
  
    // 立即执行一次
    fetchLatest();
  
    // 每 10 秒自动刷新一次
    const intervalId = setInterval(fetchLatest, 10000);
    return () => clearInterval(intervalId);
  }, []);


  // Chart init
  useEffect(() => {
    // Gait Radar Chart
    const gaitChartDom = document.getElementById("gaitRadarChart");
    if (gaitChartDom) {
      const gaitChart = echarts.init(gaitChartDom);
      const gaitOption = {
        radar: {
          indicator: [
            { name: "Stride Time", max: 1.5 },
            { name: "Stride Length", max: 1.5 },
            { name: "Speed", max: 1.5 },
            { name: "Cadence", max: 1.5 },
            { name: "Stance Ratio", max: 1.5 },
            { name: "Stance Time", max: 1.5 },
            { name: "Swing Time", max: 1.5 },
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(247,250,252,0.3)", "rgba(247,250,252,0.5)"],
            },
          },
          axisLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
          splitLine: {
            lineStyle: {
              color: "#E2E8F0",
            },
          },
        },
        series: [
          {
            name: "Movement Metrics",
            type: "radar",
            data: [
              {
                value: gaitData.current,
                name: "Current",
                lineStyle: { color: "#3B82F6" },
                itemStyle: { color: "#3B82F6" },
                areaStyle: { color: "rgba(59,130,246,0.1)" },
              },
              {
                value: gaitData.previous,
                name: "Previous",
                lineStyle: { color: "#FB923C" },
                itemStyle: { color: "#FB923C" },
                areaStyle: { color: "rgba(251,146,60,0.1)" },
              },
              {
                value: gaitData.baseline,
                name: "Baseline",
                lineStyle: { color: "#4ADE80" },
                itemStyle: { color: "#4ADE80" },
                areaStyle: { color: "rgba(74,222,128,0.1)" },
              },
            ],
          },
        ],
      };
      gaitChart.setOption(gaitOption);
    }

    // Force-Velocity Chart
    const forceVelocityChartDom = document.getElementById("forceVelocityChart");
    if (forceVelocityChartDom) {
      const forceVelocityChart = echarts.init(forceVelocityChartDom);
      const option = apiData
        ? {
            grid: { top: 20, right: 20, bottom: 40, left: 50 },
            xAxis: {
              type: "value",
              name: "Velocity (m/s)",
              nameLocation: "middle",
              nameGap: 25,
              min: 0,
              max: 3,
            },
            yAxis: {
              type: "value",
              name: "Force (N)",
              nameLocation: "middle",
              nameGap: 35,
              min: 0,
              max: 1000,
            },
            series: [
              {
                name: "Current Session",
                type: "line",
                data: [[apiData.velocity, apiData.force]], // 单个数据点
                smooth: true,
                symbolSize: 8,
                lineStyle: { color: "#3B82F6", width: 3 },
                itemStyle: { color: "#3B82F6" },
              },
            ],
          }
        : {
            grid: { top: 20, right: 20, bottom: 40, left: 50 },
            xAxis: {
              type: "value",
              name: "Velocity (m/s)",
              nameLocation: "middle",
              nameGap: 25,
              min: 0,
              max: 3,
            },
            yAxis: {
              type: "value",
              name: "Force (N)",
              nameLocation: "middle",
              nameGap: 35,
              min: 0,
              max: 1000,
            },
            series: [
              {
                // Previous session curve
                type: "line",
                data: previousSessionData.force.map((force, index) => [
                  previousSessionData.velocity[index],
                  force,
                ]),
                smooth: true,
                symbolSize: 6,
                lineStyle: { color: "#E5E7EB", width: 2 },
                itemStyle: { color: "#E5E7EB" },
              },
              {
                // Current session curve
                type: "line",
                data: velocityData.force.map((force, index) => [
                  velocityData.velocity[index],
                  force,
                ]),
                smooth: true,
                symbolSize: 8,
                lineStyle: { color: "#3B82F6", width: 3 },
                itemStyle: { color: "#3B82F6" },
              },
            ],
          };
    
      forceVelocityChart.setOption(option);
    }
    

    // EMG Chart
    const chartDom = document.getElementById("emgChart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 20 }, (_, i) => i),
        },
        yAxis: { type: "value" },
        series: [
          {
            data: emgData,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(0,168,232,0.2)" },
                  { offset: 1, color: "rgba(0,168,232,0)" },
                ],
              },
            },
            lineStyle: { color: "#00A8E8" },
            symbol: "none",
          },
        ],
      };
      myChart.setOption(option);
    }
  }, [emgData]);

  const [mvcValue, setMvcValue] = useState(87);
  const [fatigueScore, setFatigueScore] = useState(32);
  const [estimatedTime, setEstimatedTime] = useState(25);
  const [workoutZone, setWorkoutZone] = useState("Warm-up");

  const [fatigueHistory, setFatigueHistory] = useState<number[]>(
    Array(20).fill(60)
  );
  const [enduranceData, setEnduranceData] = useState<number[]>([
    85, 82, 80, 78, 75, 73, 70,
  ]);
  const [forceData, setForceData] = useState<{
    current: number[];
    previous: number[];
  }>({
    current: Array(20)
      .fill(0)
      .map(() => Math.random() * 200 + 700),
    previous: Array(20)
      .fill(0)
      .map(() => Math.random() * 200 + 650),
  });

  const [velocityData, setVelocityData] = useState<{
    force: number[];
    velocity: number[];
  }>({
    force: [
      // Current session (shifted outward curve)
      1000, 800, 650, 520, 420, 340, 280, 230, 190, 160,
    ],
    velocity: [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9],
  });

  const previousSessionData = {
    force: [900, 720, 580, 460, 370, 300, 250, 210, 180, 150],
    velocity: [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9],
  };

  const [correlationData, setCorrelationData] = useState<{
    external: number[];
    internal: number[];
  }>({
    external: Array(10).fill(0),
    internal: Array(10).fill(0),
  });

  // correlation chart
  useEffect(() => {
    const correlationChartDom = document.getElementById("correlationChart");
    if (correlationChartDom) {
      const correlationChart = echarts.init(correlationChartDom);
      const option = {
        grid: { top: 8, right: 8, bottom: 24, left: 24 },
        xAxis: {
          type: "category",
          data: Array.from({ length: 10 }, (_, i) => i),
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: "External Load",
            type: "line",
            smooth: true,
            data: correlationData.external,
            lineStyle: { color: "#A855F7" },
            symbol: "none",
          },
          {
            name: "Internal Load",
            type: "line",
            smooth: true,
            data: correlationData.internal,
            lineStyle: { color: "#F97316" },
            symbol: "none",
          },
        ],
      };
      correlationChart.setOption(option);
    }
  }, [correlationData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorrelationData((prev) => ({
        external: [...prev.external.slice(1), Math.random() * 100],
        internal: [...prev.internal.slice(1), Math.random() * 100],
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fatigue & Endurance charts
  useEffect(() => {
    // Fatigue chart
    const fatigueChartDom = document.getElementById("fatigueChart");
    if (fatigueChartDom) {
      const fatigueChart = echarts.init(fatigueChartDom);
      const option = {
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: "category",
          data: ["0min", "10min", "20min", "30min"],
          axisLine: { show: true },
          axisTick: { show: true },
          axisLabel: { show: true },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          axisLine: { show: true },
          axisTick: { show: true },
          axisLabel: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: [20, 58, 85, 90],
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#3B82F6", width: 3 },
            itemStyle: { color: "#3B82F6" },
            markLine: {
              silent: true,
              label: {
                show: true,
                formatter: "Optimal Zone (70-80%)",
                position: "insideEndTop",
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: [2, 4],
                borderRadius: 2,
                color: "#64748B",
              },
              lineStyle: {
                color: "#94A3B8",
                type: "dashed",
                width: 1,
              },
              data: [
                {
                  yAxis: 70,
                  label: {
                    show: true,
                    position: "start",
                    formatter: "70%",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: [2, 4],
                    borderRadius: 2,
                    color: "#64748B",
                  },
                },
                {
                  yAxis: 80,
                  label: {
                    show: true,
                    position: "start",
                    formatter: "80%",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: [2, 4],
                    borderRadius: 2,
                    color: "#64748B",
                  },
                },
              ],
            },
          },
        ],
      };
      fatigueChart.setOption(option);
    }

    // Endurance chart
    const enduranceChartDom = document.getElementById("enduranceChart");
    if (enduranceChartDom) {
      const enduranceChart = echarts.init(enduranceChartDom);
      const option = {
        grid: { top: 20, right: 20, bottom: 20, left: 40 },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Today"],
          axisLine: { show: true },
          axisTick: { show: true },
          axisLabel: { show: true, interval: 0 },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          axisLine: { show: true },
          axisTick: { show: true },
          axisLabel: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: [85, 78, 82, 75, 80, 72],
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              color: "#3B82F6",
              borderRadius: [4, 4, 0, 0],
            },
          },
        ],
      };
      enduranceChart.setOption(option);
    }

    // Simulate real-time changes
    const interval = setInterval(() => {
      setMvcValue((prev) =>
        Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10))
      );
      setFatigueHistory((prev) => {
        const newValue = Math.min(
          100,
          Math.max(0, prev[prev.length - 1] + (Math.random() - 0.5) * 5)
        );
        return [...prev.slice(1), newValue];
      });
      setFatigueScore((prev) =>
        Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5))
      );
      setEstimatedTime((prev) => Math.max(1, prev + (Math.random() - 0.5) * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getZoneColor = (mvc: number) => {
    // Return text color and background color for the "current zone" chip
    if (mvc >= 80)
      return {
        color: "#EF4444", // text-red-500
        backgroundColor: "#FEF2F2", // bg-red-50
      };
    if (mvc >= 60)
      return {
        color: "#F97316", // text-orange-500
        backgroundColor: "#FFF7ED", // bg-orange-50
      };
    if (mvc >= 40)
      return {
        color: "#F59E0B", // text-yellow-500
        backgroundColor: "#FFFBEB", // bg-yellow-50
      };
    return {
      color: "#10B981", // text-green-500
      backgroundColor: "#ECFDF5", // bg-green-50
    };
  };

  const quickStats = [
    {
      title: "Muscle Activation",
      value: apiData ? `${Math.round(apiData.muscle_activation * 100)}%` : "N/A",
      subtext: "MVC",
      icon: "fa-bolt",
      component: (
        <div style={{ position: "relative", width: "64px", height: "64px" }}>
          <div
            style={{
              position: "absolute",
              inset: "0px",
              borderRadius: "9999px",
              border: "4px solid #F3F4F6", // gray-100
              background: `conic-gradient(#3B82F6 ${(apiData?.muscle_activation || 0) * 360}deg, #F3F4F6 ${(apiData?.muscle_activation || 0) * 360}deg)`,
              transform: "rotate(-90deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "4px",
              backgroundColor: "#FFFFFF",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            {apiData ? `${Math.round(apiData.muscle_activation * 100)}%` : "N/A"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Fatigue Score",
      value: apiData ? `${Math.round(apiData.muscle_fatigue * 100)}` : "N/A",
      subtext: "points",
      icon: "fa-battery-half",
      component: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "64px",
              height: "64px", 
              marginBottom: "4px",
            }}
          >
            <svg width="64" height="64" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${apiData ? apiData.muscle_fatigue * 100 : 0}, 100`}
              />
              <text
                x="18"
                y="20.35"
                style={{
                  fontSize: "8px",
                  fontWeight: 600,
                }}
                textAnchor="middle"
                fill="#1F2937"
              >
                {apiData ? `${Math.round(apiData.muscle_fatigue * 100)}` : "0"}
              </text>
            </svg>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          ></div>
        </div>
      ),
    },
    {
      title: "Current Zone",
      value: (() => {
        const activation = apiData?.muscle_activation || 0;
        if (activation >= 0.8) return "Max Effort";
        if (activation >= 0.6) return "Power";
        if (activation >= 0.4) return "Build";
        return "Warm-up";
      })(),
      subtext: apiData ? `${Math.round(apiData.muscle_activation * 100)}% MVC` : "--% MVC",
      icon: "fa-signal",
      component: (
        <div
          style={{
            padding: "4px 12px",
            borderRadius: "9999px",
            ...getZoneColor(apiData?.muscle_activation || 0),
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {(() => {
            const activation = apiData?.muscle_activation || 0;
            if (activation >= 0.8) return "Max Effort";
            if (activation >= 0.6) return "Power";
            if (activation >= 0.4) return "Build";
            return "Warm-up";
          })()}
        </div>
      ),
    },

    {
      title: "Est. Time to Peak",
      value: `${Math.round(estimatedTime)}`,
      subtext: "min",
      icon: "fa-clock",
      component: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i
            className="fas fa-clock"
            style={{ color: colorBlue500, fontSize: "1.25rem" }}
          ></i>
          <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>
            {Math.round(estimatedTime)}m
          </span>
        </div>
      ),
    },
  ];

  const [gaitData, setGaitData] = useState({
    current: [1.2, 1.3, 0.9, 1.1, 1.0, 0.95, 1.15],
    previous: [1.0, 1.1, 0.8, 0.9, 0.85, 0.8, 1.0],
    baseline: [0.8, 0.9, 0.7, 0.8, 0.75, 0.7, 0.85],
  });

  const insights = [
    {
      title: "Perfect Form",
      desc: "Your squat form has improved by 15%",
      icon: "fa-medal",
    },
    {
      title: "Recovery Needed",
      desc: "High fatigue detected in left quadriceps",
      icon: "fa-triangle-exclamation",
    },
    {
      title: "Gait Improvement",
      desc: "Stride symmetry increased by 8%",
      icon: "fa-person-walking",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        minHeight: "762px",
        backgroundColor: colorGray50,
      }}
    >
      {/* Nav Bar */}
      <div
        style={{
          position: "center",
          top: 0,
          width: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0px",
          boxShadow: boxShadowSm,
          zIndex: 50,
          transition: "background-color 0.3s, color 0.3s",
          backgroundColor: isDarkMode ? colorGray900 : colorWhite,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h2
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: isDarkMode ? colorWhite : colorGray900,
              }}
            >
              Good Morning, Alex
            </h2>
            <p
              style={{
                fontSize: "0.75rem",
                color: isDarkMode ? colorGray400 : colorGray500,
              }}
            >
              Sunday, 5:22 AM
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkMode ? colorGray800 : colorGray50,
              transition: "background-color 0.3s, color 0.3s",
              cursor: "pointer",
            }}
          >
            <i
              className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}
              style={{
                color: isDarkMode ? "#FACC15" : colorGray600,
              }}
            ></i>
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkMode ? colorGray800 : colorGray50,
              transition: "background-color 0.3s, color 0.3s",
              cursor: "pointer",
            }}
          >
            <i
              className="fas fa-bell"
              style={{
                color: isDarkMode ? colorGray400 : colorGray600,
              }}
            ></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          paddingTop: "0px",
          paddingBottom: "80px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Ensures 2 columns
            gap: "16px",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {quickStats.slice(0, 4).map(
            (
              stat,
              index // Ensures only 4 items in 2x2 grid
            ) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #E0E0E0", // Light border for separation
                  minHeight: "120px", // Ensures equal height
                }}
              >
                <h3
                  style={{
                    fontSize: "0.875rem",
                    color: "#666", // Ensures better contrast
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  {stat.title}
                </h3>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {stat.component}
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#999",
                    marginTop: "8px",
                  }}
                >
                  {stat.subtext}
                </p>
              </div>
            )
          )}
        </div>

        {/* Real-time EMG Graph */}
        <div
          style={{
            backgroundColor: colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            Real-time Muscle Activity
          </h3>
          <div id="emgChart" style={{ width: "100%", height: "150px" }}></div>
        </div>

        {/* Muscle Force & Power Analysis */}
        <div
          style={{
            backgroundColor: colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            Muscle Force & Power Analysis
          </h3>

          {/* Real-time Force Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Current Force
              </p>

              <div style={{ display: "flex", alignItems: "baseline" }}>
  <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
    {apiData ? Math.round(apiData.force) : "N/A"}
  </span>
  <span style={{ fontSize: "0.75rem", color: colorGray500, marginLeft: "4px" }}>
    N
  </span>
</div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Peak Force
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  965
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  N
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Average Force
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  756
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  N
                </span>
              </div>
            </div>
          </div>

          {/* Force-Velocity Analysis */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Force-Velocity Profile
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: colorBlue500,
                      marginRight: "4px",
                    }}
                  ></span>
                  Current
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: "#D1D5DB", // gray-300
                      marginRight: "4px",
                    }}
                  ></span>
                  Previous
                </span>
              </div>
            </div>
            <div
              id="forceVelocityChart"
              style={{ width: "100%", height: "150px" }}
            ></div>
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <i
                  className="fas fa-circle-info"
                  style={{ color: colorGray400, fontSize: "0.875rem" }}
                ></i>
                <span style={{ fontSize: "0.75rem", color: colorGray500 }}>
                  RFD: 2450 N/s
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#22C55E", // text-green-500
                  fontSize: "0.75rem",
                }}
              >
                <i
                  className="fas fa-arrow-trend-up"
                  style={{ marginRight: "4px" }}
                ></i>
                <span>+15% vs last session</span>
              </div>
            </div>
          </div>

          {/* Training Focus Recommendation */}
          <div
            style={{
              padding: "16px",
              backgroundColor: colorBlue50,
              borderRadius: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "9999px",
                  backgroundColor: "#DBEAFE", // bg-blue-100
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i
                  className="fas fa-bullseye"
                  style={{ color: colorBlue500 }}
                ></i>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: colorGray900,
                    marginBottom: "4px",
                  }}
                >
                  Training Focus
                </h4>
                <p style={{ fontSize: "0.75rem", color: colorGray600 }}>
                  Based on your force-velocity profile, focus on explosive power
                  training to optimize athletic performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Muscle Activation & Efficiency */}
        <div
          style={{
            backgroundColor: colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            Muscle Activation & Efficiency
          </h3>

          {/* Live Activation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Live Activation
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {Math.round(mvcValue)}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  %MVC
                </span>
              </div>
            </div>
            <div
              style={{ position: "relative", width: "80px", height: "80px" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0px",
                  borderRadius: "9999px",
                  border: "4px solid transparent",
                  background: `conic-gradient(#3B82F6 ${
                    mvcValue * 3.6
                  }deg, #F3F4F6 ${mvcValue * 3.6}deg)`,
                  transform: "rotate(-90deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "8px",
                  backgroundColor: colorWhite,
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fas fa-bolt" style={{ color: colorBlue500 }}></i>
              </div>
            </div>
          </div>

          {/* Muscle Balance */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                  Quad/Ham Balance
                </p>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                    1.2
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: colorGray500,
                      marginLeft: "4px",
                    }}
                  >
                    :1
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    backgroundColor: colorGreen50,
                    color: colorGreen500,
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Balanced
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", height: "16px" }}>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#BFDBFE", // blue-100
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: colorBlue500,
                    height: "100%",
                    width: "55%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#BBF7D0", // green-100
                  borderTopRightRadius: "9999px",
                  borderBottomRightRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: colorGreen500,
                    height: "100%",
                    width: "45%",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: colorBlue500,
                }}
              >
                Quadriceps
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: colorGreen500,
                }}
              >
                Hamstrings
              </span>
            </div>
          </div>

          {/* Load Correlation */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Load Correlation
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: colorPurple500,
                      marginRight: "4px",
                    }}
                  ></span>
                  External
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: colorOrange400,
                      marginRight: "4px",
                    }}
                  ></span>
                  Internal
                </span>
              </div>
            </div>
            <div
              id="correlationChart"
              style={{ width: "100%", height: "120px" }}
            ></div>
          </div>

          {/* Efficiency Score */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px",
              backgroundColor: colorGray50,
              borderRadius: "0.75rem",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Efficiency Score
              </p>
              <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                92
                <span style={{ fontSize: "0.875rem", color: colorGray500 }}>
                  /100
                </span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: colorGreen500,
              }}
            >
              <i
                className="fas fa-arrow-trend-up"
                style={{ marginRight: "4px" }}
              ></i>
              <span style={{ fontSize: "0.875rem" }}>+5%</span>
            </div>
          </div>
        </div>

        {/* Fatigue & Endurance Tracking */}
        <div
          style={{
            backgroundColor: colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            Fatigue & Endurance Tracking
          </h3>

          {/* Live Fatigue Score */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div>
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Live Fatigue Score
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {Math.round(fatigueScore)}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  /100
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: colorBlue50,
                  color: colorBlue500,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {fatigueScore >= 75 ? "Optimal Zone" : "Building Up"}
              </div>
            </div>
          </div>

          {/* Optimal Zone Progress */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Progress to Optimal Zone
              </p>
              <span style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                {Math.round(estimatedTime)}min to target
              </span>
            </div>
            <div
              style={{
                position: "relative",
                height: "200px",
                marginBottom: "8px",
              }}
            >
              <div
                id="fatigueChart"
                style={{ width: "100%", height: "150px" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: colorGray500,
              }}
            >
              <span>0min</span>
              <span>10min</span>
              <span>20min</span>
              <span>30min</span>
            </div>
          </div>

          {/* Endurance Metrics */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Load Required for 75% Fatigue
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#22C55E",
                  fontSize: "0.75rem",
                }}
              >
                <i
                  className="fas fa-arrow-trend-down"
                  style={{ marginRight: "4px" }}
                ></i>
                <span>-12% vs last session</span>
              </div>
            </div>
            <div style={{ height: "180px", marginBottom: "8px" }}>
              <div
                id="enduranceChart"
                style={{ width: "100%", height: "150px" }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: colorGray500,
              }}
            >
              <span>Previous Sessions</span>
              <span>Current</span>
            </div>
          </div>
        </div>

        {/* Gait & Stability Metrics */}
        <div
          style={{
            backgroundColor: colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            Gait & Stability Metrics
          </h3>

          {/* Radar Chart */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: colorGray500 }}>
                Movement Analysis
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: colorBlue500,
                      marginRight: "4px",
                    }}
                  ></span>
                  Current
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: colorOrange400,
                      marginRight: "4px",
                    }}
                  ></span>
                  Previous
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: "#4ADE80", // green-400
                      marginRight: "4px",
                    }}
                  ></span>
                  Baseline
                </span>
              </div>
            </div>
            <div
              id="gaitRadarChart"
              style={{ width: "100%", height: "200px" }}
            ></div>
          </div>

          {/* Detailed Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Cadence
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  172
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  steps/min
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Speed
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  5.2
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  km/h
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Stride Length
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  1.2
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  m
                </span>
              </div>
            </div>
            <div
              style={{
                padding: "12px",
                backgroundColor: colorGray50,
                borderRadius: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colorGray500,
                  marginBottom: "4px",
                }}
              >
                Stability Index
              </p>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600 }}>85</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: colorGray500,
                    marginLeft: "4px",
                  }}
                >
                  /100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Coach & Insights */}
        <div
          style={{
            backgroundColor: isDarkMode ? colorGray900 : colorWhite,
            borderRadius: "0.75rem",
            padding: "16px",
            boxShadow: boxShadowSm,
            marginBottom: "24px",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(to bottom right, #60A5FA, #A78BFA)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://public.readdy.ai/ai/img_res/90c68d1d73149304f7be3c699585fbab.jpg"
                  alt="AI Coach"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                  }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isDarkMode ? colorWhite : colorGray900,
                  }}
                >
                  Fitty - AI Coach
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: isDarkMode ? colorGray400 : colorGray500,
                  }}
                >
                  Your personal fitness companion
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAICoach(!showAICoach)}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: isDarkMode ? colorGray800 : colorBlue50,
                color: isDarkMode ? colorBlue400 : colorBlue500,
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
                border: "none",
              }}
            >
              <i className="fas fa-message" style={{ marginRight: "8px" }}></i>
              Chat
            </button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {insights.map((insight, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: isDarkMode ? colorGray800 : colorGray50,
                  borderRadius: "0.75rem",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    backgroundColor: isDarkMode ? colorGray700 : colorBlue50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className={`fas ${insight.icon}`}
                    style={{
                      color: isDarkMode ? colorBlue400 : colorBlue500,
                    }}
                  ></i>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: isDarkMode ? colorWhite : colorGray900,
                      marginBottom: "4px",
                    }}
                  >
                    {insight.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: isDarkMode ? colorGray400 : colorGray500,
                    }}
                  >
                    {insight.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* AI Coach Chat Modal */}
          {showAICoach && (
            <div
              style={{
                position: "fixed",
                inset: "0px",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  backgroundColor: isDarkMode ? colorGray900 : colorWhite,
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                  padding: "16px",
                  animation: "slide-up 0.3s ease-out",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src="https://public.readdy.ai/ai/img_res/c7414689fe005a4e0653b1d75ffc00a3.jpg"
                      alt="AI Coach"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "9999px",
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 500,
                        color: isDarkMode ? colorWhite : colorGray900,
                      }}
                    >
                      Fitty
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAICoach(false)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "9999px",
                      backgroundColor: isDarkMode ? colorGray800 : colorGray100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <i
                      className="fas fa-times"
                      style={{
                        color: isDarkMode ? colorGray400 : colorGray600,
                      }}
                    ></i>
                  </button>
                </div>
                <div
                  style={{
                    height: "400px",
                    overflowY: "auto",
                    marginBottom: "16px",
                  }}
                >
                  {aiMessages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.type === "user" ? "flex-end" : "flex-start",
                        marginBottom: "12px",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "80%",
                          borderRadius: "1rem",
                          padding: "8px 16px",
                          fontSize: "0.875rem",
                          ...(msg.type === "user"
                            ? {
                                backgroundColor: isDarkMode
                                  ? "#2563EB"
                                  : "#3B82F6",
                                color: "#FFFFFF",
                              }
                            : {
                                backgroundColor: isDarkMode
                                  ? colorGray800
                                  : colorGray100,
                                color: isDarkMode ? colorWhite : colorGray900,
                              }),
                        }}
                      >
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    backgroundColor: isDarkMode ? colorGray800 : colorGray100,
                    borderRadius: "9999px",
                    padding: "8px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask Fitty anything..."
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: "0.875rem",
                      color: isDarkMode ? colorWhite : colorGray900,
                    }}
                  />
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "9999px",
                      backgroundColor: isDarkMode ? colorBlue600 : colorBlue500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    <i
                      className="fas fa-paper-plane"
                      style={{ color: colorWhite, fontSize: "0.75rem" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: isDarkMode ? colorGray900 : colorWhite,
          borderTop: `1px solid ${isDarkMode ? colorGray800 : colorGray100}`,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          padding: "8px 16px",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {[
          { id: "dashboard", icon: "fa-house" },
          { id: "analysis", icon: "fa-chart-simple" },
          { id: "history", icon: "fa-clock-rotate-left" },
          { id: "profile", icon: "fa-user" },
        ].map((tab) => {
          const isSelected = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: isSelected
                  ? isDarkMode
                    ? colorBlue400
                    : colorBlue500
                  : isDarkMode
                  ? colorGray500
                  : "#9CA3AF",
                transition: "all 0.3s",
              }}
            >
              <i
                className={`fas ${tab.icon}`}
                style={{ fontSize: "1.125rem", marginBottom: "4px" }}
              ></i>
              <span
                style={{ fontSize: "0.75rem", textTransform: "capitalize" }}
              >
                {tab.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;