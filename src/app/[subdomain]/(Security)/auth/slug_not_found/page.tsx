"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import SlogNotFound from "@/modules/auth/components/slug_not_found";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", left: "1rem" }} />

      <Suspense fallback={<LoadingUI />}>
        <SlogNotFound />
      </Suspense>
    </AuthProvider>
  );
}
