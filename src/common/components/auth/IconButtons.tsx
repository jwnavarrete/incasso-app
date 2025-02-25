import React from "react";
import { Box } from "@mui/material";
import ColorMode from "@/theme/ColorModeSelector";
import LanguageDropdown from "@/theme/ColorModeSelector/LanguageDropdown";

const IconButtons: React.FC = () => {
  return (
    <>
      <ColorMode />
      <Box
        sx={{
          position: "fixed",
          top: "1rem",
          left: { xs: "1rem", sm: "3.5rem" },
          // display: { xs: 'none', sm: 'block' },
        }}
      >
        <LanguageDropdown />
      </Box>
    </>
  );
};

export default IconButtons;
