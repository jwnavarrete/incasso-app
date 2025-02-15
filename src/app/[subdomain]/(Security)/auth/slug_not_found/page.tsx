"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import SlogNotFound from "@/modules/auth/components/slug_not_found";
import LoadingUI from "@/common/components/ui/LoadingUI";
import ColorMode from "@/theme/ColorModeSelector";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorMode />

      <Suspense fallback={<LoadingUI />}>
        <SlogNotFound />
      </Suspense>
    </AuthProvider>
  );
}
