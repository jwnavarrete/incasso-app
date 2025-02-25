"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import AccountUrl from "@/modules/auth/components/get_account_url";
import LoadingUI from "@/common/components/ui/LoadingUI";
import IconButtons from "@/common/components/auth/IconButtons";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <IconButtons />

      <Suspense fallback={<LoadingUI />}>
        <AccountUrl />
      </Suspense>
    </AuthProvider>
  );
}
