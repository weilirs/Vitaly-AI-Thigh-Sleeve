import React from "react";
import {
  boxShadowSm,
  colorGray400,
  colorGray50,
  colorGray500,
  colorGray600,
  colorGray800,
  colorGray900,
  colorWhite
} from "../utils/styles";

interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div
      style={{
        position: "relative",
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
  );
};

export default NavBar; 