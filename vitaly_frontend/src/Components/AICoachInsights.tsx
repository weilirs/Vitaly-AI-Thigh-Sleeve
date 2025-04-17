import React, { Dispatch, SetStateAction, useState } from "react";
import {
  boxShadowSm,
  colorWhite,
  colorGray50,
  colorGray100,
  colorGray400,
  colorGray500,
  colorGray600,
  colorGray700,
  colorGray800,
  colorGray900,
  colorBlue50,
  colorBlue400,
  colorBlue500,
  colorBlue600
} from "../utils/styles";
import { ChatMessage } from "../utils/types";

interface Insight {
  title: string;
  desc: string;
  icon: string;
}

interface AICoachInsightsProps {
  isDarkMode: boolean;
  showAICoach: boolean;
  setShowAICoach: Dispatch<SetStateAction<boolean>>;
  aiMessages: ChatMessage[];
  insights: Insight[];
  setAiMessages?: Dispatch<SetStateAction<ChatMessage[]>>;
}

const AICoachInsights: React.FC<AICoachInsightsProps> = ({
  isDarkMode,
  showAICoach,
  setShowAICoach,
  aiMessages,
  insights,
  setAiMessages
}) => {
  const [inputValue, setInputValue] = useState("");
  
  return (
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
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
  );
};

export default AICoachInsights; 