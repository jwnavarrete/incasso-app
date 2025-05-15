// components/ReduxProvider.tsx
"use client";
import React from "react";
import { Provider } from "react-redux"; // Para manejar el estado de Redux
import store from "@/store/global.store"; // Tu store de Redux

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;