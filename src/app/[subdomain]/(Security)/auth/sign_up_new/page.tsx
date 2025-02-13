"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import SignUpNew from "@/modules/auth/components/sign_up_new";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
        <CssBaseline enableColorScheme />
        <ColorModeSelect
          sx={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            display: { xs: "none", sm: "block" },
          }}
        />

        <Suspense fallback={<LoadingUI />}>
          <SignUpNew />
        </Suspense>      
    </AuthProvider>
  );
}
