import React from "react";
import {
  boxShadowSm,
  colorWhite,
  colorGray50,
  colorGray500,
  colorBlue500,
  colorGreen50,
  colorGreen500,
  colorPurple500,
  colorOrange400
} from "../utils/styles";

interface MuscleActivationProps {
  mvcValue: number;
  correlationChartId: string;
}

const MuscleActivation: React.FC<MuscleActivationProps> = ({ 
  mvcValue,
  correlationChartId
}) => {
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
          id={correlationChartId}
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
  );
};

export default MuscleActivation; 