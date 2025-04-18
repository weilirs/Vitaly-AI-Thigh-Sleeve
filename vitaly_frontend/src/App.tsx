import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import {
  colorGray50,
  colorOrange400,
  colorPurple500
} from "./utils/styles";
import { 
  ApiData, 
  ChatMessage, 
  ForceData, 
  VelocityData, 
  CorrelationData, 
  GaitData,
  PreviousSessionData 
} from "./utils/types";
import NavBar from "./Components/NavBar";
import TabBar from "./Components/TabBar";
import QuickStats from "./Components/QuickStats";
import { generateQuickStats } from "./Components/QuickStatHelpers";
import EmgChart from "./Components/EmgChart";
import ForceAnalysis from "./Components/ForceAnalysis";
import MuscleActivation from "./Components/MuscleActivation";
import FatigueTracking from "./Components/FatigueTracking";
import GaitStabilityMetrics from "./Components/GaitStabilityMetrics";
import AICoachInsights from "./Components/AICoachInsights";
import Login from "./Components/Login";
import { Toaster } from "sonner";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiData, setApiData] = useState<null | ApiData>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([
    {
      type: "ai",
      message:
        "Hi! I'm Fitty, your AI fitness coach! 😺 How can I help you today?",
    },
  ]);
  const [emgData, setEmgData] = useState<number[]>([]);
  

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
 
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
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
  const [forceData, setForceData] = useState<ForceData>({
    current: Array(20)
      .fill(0)
      .map(() => Math.random() * 200 + 700),
    previous: Array(20)
      .fill(0)
      .map(() => Math.random() * 200 + 650),
  });

  const [velocityData] = useState<VelocityData>({
    force: [
      // Current session (shifted outward curve)
      1000, 800, 650, 520, 420, 340, 280, 230, 190, 160,
    ],
    velocity: [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9],
  });

  const previousSessionData: PreviousSessionData = {
    force: [900, 720, 580, 460, 370, 300, 250, 210, 180, 150],
    velocity: [0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9],
  };

  const [correlationData, setCorrelationData] = useState<CorrelationData>({
    external: Array(10).fill(0),
    internal: Array(10).fill(0),
  });
  
  const [gaitData] = useState<GaitData>({
    current: [1.2, 1.3, 0.9, 1.1, 1.0, 0.95, 1.15],
    previous: [1.0, 1.1, 0.8, 0.9, 0.85, 0.8, 1.0],
    baseline: [0.8, 0.9, 0.7, 0.8, 0.75, 0.7, 0.85],
  });

  // Simulate real-time EMG data
  useEffect(() => {
    const interval = setInterval(() => {
      setEmgData((prev) => [...prev.slice(-19), Math.random() * 100]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only fetch data if the user is authenticated
    if (!isAuthenticated) return;
    
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
  }, [isAuthenticated]);

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
            lineStyle: { color: colorPurple500 },
            symbol: "none",
          },
          {
            name: "Internal Load",
            type: "line",
            smooth: true,
            data: correlationData.internal,
            lineStyle: { color: colorOrange400 },
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

  // Fatigue & Endurance data updates
  useEffect(() => {
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

  if (!isAuthenticated) {
    return (
      <>
        <Login onSubmit={() => handleLogin()} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "400px",
          minHeight: "762px",
          backgroundColor: colorGray50,
        }}
      >
        {/* Nav Bar */}
        <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

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
          <QuickStats stats={generateQuickStats(apiData, estimatedTime)} />

          {/* Real-time EMG Graph */}
          <EmgChart emgData={emgData} />

          {/* Muscle Force & Power Analysis */}
          <ForceAnalysis 
            apiData={apiData} 
            velocityData={velocityData}
            previousSessionData={previousSessionData}
          />

          {/* Muscle Activation & Efficiency */}
          <MuscleActivation mvcValue={mvcValue} correlationChartId="correlationChart" />

          {/* Fatigue & Endurance Tracking */}
          <FatigueTracking
            fatigueScore={fatigueScore}
            fatigueHistory={fatigueHistory}
            estimatedTime={estimatedTime}
            mvcValue={mvcValue}
            workoutZone={workoutZone}
            setWorkoutZone={setWorkoutZone}
          />

          {/* Gait & Stability Metrics */}
          <GaitStabilityMetrics gaitData={gaitData} />

          {/* AI Coach & Insights */}
          <AICoachInsights
            isDarkMode={isDarkMode}
            showAICoach={showAICoach}
            setShowAICoach={setShowAICoach}
            aiMessages={aiMessages}
            insights={insights}
            setAiMessages={setAiMessages}
          />

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab Bar */}
        <TabBar
          isDarkMode={isDarkMode}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <Toaster />
    </>
  );
};

export default App;