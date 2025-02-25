"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import LoginCompany from "@/modules/auth/components/login_company";
import LoadingUI from "@/common/components/ui/LoadingUI";
import IconButtons from "@/common/components/auth/IconButtons";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <IconButtons />

      <Suspense fallback={<LoadingUI />}>
        <LoginCompany />
      </Suspense>
    </AuthProvider>
  );
}
