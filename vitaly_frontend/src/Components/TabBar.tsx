import React, { Dispatch, SetStateAction } from "react";
import {
  colorGray100,
  colorGray500,
  colorGray800,
  colorGray900,
  colorWhite,
  colorBlue400,
  colorBlue500
} from "../utils/styles";

interface TabItem {
  id: string;
  icon: string;
}

interface TabBarProps {
  isDarkMode: boolean;
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

const TabBar: React.FC<TabBarProps> = ({
  isDarkMode,
  selectedTab,
  setSelectedTab
}) => {
  const tabs: TabItem[] = [
    { id: "dashboard", icon: "fa-house" },
    { id: "analysis", icon: "fa-chart-simple" },
    { id: "history", icon: "fa-clock-rotate-left" },
    { id: "profile", icon: "fa-user" }
  ];

  return (
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
      {tabs.map((tab) => {
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
  );
};

export default TabBar; 