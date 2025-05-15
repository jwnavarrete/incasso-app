import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ColorModeSelect from "./ColorModeIconDropdown";
import ColorModeSelectFab from "./ColorModeSelectFab";

const ColorMode: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isSmallScreen ? (
        <ColorModeSelectFab />
      ) : (
        <ColorModeSelect
          sx={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            display: { xs: "none", sm: "block" },
          }}
        />
      )}
    </>
  );
};

export default ColorMode;
