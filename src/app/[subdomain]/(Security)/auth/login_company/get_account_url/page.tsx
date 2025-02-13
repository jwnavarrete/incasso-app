"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import AccountUrl from "@/modules/auth/components/get_account_url";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", left: "1rem" }} />

      <Suspense fallback={<LoadingUI />}>
        <AccountUrl />
      </Suspense>
    </AuthProvider>
  );
}
