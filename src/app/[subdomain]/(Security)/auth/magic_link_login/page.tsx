"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import MagicLinkLogin from "@/modules/auth/components/magic_link_login";
import LoadingUI from "@/common/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      
      <Suspense fallback={<LoadingUI />}>
        <MagicLinkLogin />
      </Suspense>
    </AuthProvider>
  );
}
