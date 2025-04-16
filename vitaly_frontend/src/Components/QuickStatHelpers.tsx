import React from "react";
import { QuickStat } from "./QuickStats";
import { ApiData } from "../utils/types";
import { colorBlue500 } from "../utils/styles";
import { getZoneColor } from "../utils/styles";

export const generateQuickStats = (
  apiData: ApiData | null,
  estimatedTime: number
): QuickStat[] => {
  return [
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
}; 