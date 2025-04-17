import React, { useEffect, Dispatch, SetStateAction } from "react";
import * as echarts from "echarts";
import {
  boxShadowSm,
  colorWhite,
  colorGray500,
  colorBlue50,
  colorBlue500
} from "../utils/styles";

interface FatigueTrackingProps {
  fatigueScore: number;
  fatigueHistory: number[];
  estimatedTime: number;
  mvcValue: number;
  workoutZone: string;
  setWorkoutZone: Dispatch<SetStateAction<string>>;
}

const FatigueTracking: React.FC<FatigueTrackingProps> = ({
  fatigueScore,
  fatigueHistory,
  estimatedTime,
  mvcValue,
  workoutZone,
  setWorkoutZone
}) => {
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
  }, []);

  return (
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
  );
};

export default FatigueTracking; 