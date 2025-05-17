"use client";
import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/context";
import EnterSlug from "./components";
import LanguageIconButon from "@/components/ui/LanguageIconButon";
import LoadingUI from "@/components/ui/LoadingUI";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <LanguageIconButon />

      <Suspense fallback={<LoadingUI />}>
        <EnterSlug />
      </Suspense>
    </AuthProvider>
  );
}
