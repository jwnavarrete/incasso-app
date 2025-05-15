import React from "react";
import { Box } from "@mui/material";
import ColorMode from "@/components/ui/ColorModeSelectorUI";
import LanguageDropdown from "@/components/ui/ColorModeSelectorUI/LanguageDropdown";

const LanguageIconButon: React.FC = () => {
  return (
    <>
      <ColorMode />
      <Box
        sx={{
          position: "fixed",
          top: "1rem",
          left: { xs: "1rem", sm: "3.5rem" },
        }}
      >
        <LanguageDropdown />
      </Box>
    </>
  );
};

export default LanguageIconButon;
