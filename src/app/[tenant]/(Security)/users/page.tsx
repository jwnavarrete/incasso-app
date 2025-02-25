"use client";
import LoadingUI from "@/common/components/ui/LoadingUI";
import useAuthenticate from "@/common/hooks/useAuthenticate";
import UserManagement from "@/modules/users/components/management";
import { UserProvider } from "@/modules/users/context/userContext";
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
