import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import AppTheme from "@/theme/ThemeProvider";

const LoadingUI: React.FC = (props) => {
  return (
    <AppTheme {...props}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </Box>
    </AppTheme>
  );
};

export default LoadingUI;
