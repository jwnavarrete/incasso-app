"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context";
import MagicLinkLogin from "./components";
import LoadingUI from "@/components/ui/LoadingUI";

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
