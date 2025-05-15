"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context";
import LoadingUI from "@/components/ui/LoadingUI";
import ColorMode from "@/components/ui/ColorModeSelectorUI";
import ChangePassword from "./components";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />  
      <ColorMode />

      <Suspense fallback={<LoadingUI />}>
        <ChangePassword />
      </Suspense>
    </AuthProvider>
  );
}
