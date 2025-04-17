import React from "react";
import { ApiData } from "../utils/types";

export interface QuickStat {
  title: string;
  value: string;
  subtext: string;
  icon: string;
  component: React.ReactNode;
}

interface QuickStatsProps {
  stats: QuickStat[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // Ensures 2 columns
        gap: "16px",
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      {stats.slice(0, 4).map(
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
  );
};

export default QuickStats; 