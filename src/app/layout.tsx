"use client";
import * as React from "react";
import { Provider } from "react-redux"; // Para manejar el estado de Redux
import { Geist, Geist_Mono } from "next/font/google";
import store from "@/common/store/global.store";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Dashboard(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>{props.children}</Provider>
      </body>
    </html>
  );
}
