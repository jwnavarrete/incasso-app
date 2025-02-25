"use client";
import * as React from "react";
import ReduxProvider from "@/common/providers/ReduxProvider";
import { I18nextProvider } from "react-i18next";
import i18next from "@/common/lib/i18n"; // Importa tu configuración de i18next

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
