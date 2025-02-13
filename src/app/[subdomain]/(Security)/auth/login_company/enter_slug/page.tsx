"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ColorModeSelect from "@/theme/ColorModeSelect";
import { AuthProvider } from "@/modules/auth/context/authContext";
import EnterSlug from "@/modules/auth/components/enter_slug";

export default function page() {
  return (
    <AuthProvider>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", left: "1rem" }} />

      <EnterSlug />
    </AuthProvider>
  );
}
