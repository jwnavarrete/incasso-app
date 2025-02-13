import React from "react";
import { useTheme } from "@mui/material/styles";

const LogoComponent: React.FC = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  return (
    <div className="logo">
      <svg width="140" height="60" xmlns="http://www.w3.org/2000/svg">
        <g>
          <image
            href="/static/LogoAPP.png"
            x="0"
            y="5"
            height="50"
            width="50"
          />
          <text x="45" y="25" fill={textColor} fontSize="15" fontWeight="bold">
            CENTRAAL
          </text>
          <text x="45" y="45" fill={textColor} fontSize="15" fontWeight="bold">
            INNING
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LogoComponent;
