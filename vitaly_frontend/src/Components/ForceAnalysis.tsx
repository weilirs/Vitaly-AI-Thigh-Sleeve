import React from "react";
import {
  boxShadowSm,
  colorWhite,
  colorGray50,
  colorGray400,
  colorGray500,
  colorGray600,
  colorGray900,
  colorBlue50,
  colorBlue500
} from "../utils/styles";
import { ApiData } from "../utils/types";

interface ForceAnalysisProps {
  apiData: ApiData | null;
}

const ForceAnalysis: React.FC<ForceAnalysisProps> = ({ apiData }) => {
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
  );
};

export default ForceAnalysis; 