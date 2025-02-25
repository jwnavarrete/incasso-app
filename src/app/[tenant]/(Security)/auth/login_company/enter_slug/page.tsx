"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import EnterSlug from "@/modules/auth/components/enter_slug";
import IconButtons from "@/common/components/auth/IconButtons";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <IconButtons />

      <Suspense fallback={<LoadingUI />}>
        <EnterSlug />
      </Suspense>
    </AuthProvider>
  );
}
