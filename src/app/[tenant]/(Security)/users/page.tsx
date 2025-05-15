"use client";
import LoadingUI from "@/components/ui/LoadingUI";
import useAuthenticate from "@/hooks/useAuthenticate";
import UserManagement from "./components";
import { UserProvider } from "@/context";
import React, { Suspense } from "react";

const UsersPage: React.FC = () => {
  const isAuthenticated = useAuthenticate();
  if (!isAuthenticated || isAuthenticated === null) {
    return <LoadingUI />;
  }

  return (
    <UserProvider>
      <Suspense fallback={<LoadingUI />}>
        <UserManagement />
      </Suspense>
    </UserProvider>
  );
};

export default UsersPage;
