"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import LoadingUI from "@/common/components/ui/LoadingUI";
import ForgotPassword from "@/modules/auth/components/forgot_password";
import IconButtons from "@/common/components/auth/IconButtons";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <IconButtons />

      <Suspense fallback={<LoadingUI />}>
        <ForgotPassword />
      </Suspense>
    </AuthProvider>
  );
}
