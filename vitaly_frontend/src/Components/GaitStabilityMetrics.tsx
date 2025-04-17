import React, { useEffect } from "react";
import * as echarts from "echarts";
import {
  boxShadowSm,
  colorWhite,
  colorGray50,
  colorGray500,
  colorBlue500,
  colorOrange400
} from "../utils/styles";
import { GaitData } from "../utils/types";

interface GaitStabilityMetricsProps {
  gaitData: GaitData;
}

const GaitStabilityMetrics: React.FC<GaitStabilityMetricsProps> = ({
  gaitData
}) => {
  // Initialize gait radar chart
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
  }, [gaitData]);

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
  );
};

export default GaitStabilityMetrics; 