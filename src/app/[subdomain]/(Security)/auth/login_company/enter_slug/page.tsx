"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/modules/auth/context/authContext";
import EnterSlug from "@/modules/auth/components/enter_slug";
import ColorMode from "@/theme/ColorModeSelector";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorMode />

      <EnterSlug />
    </AuthProvider>
  );
}
