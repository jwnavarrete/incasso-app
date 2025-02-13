"use client";
import MainGrid from "@/common/components/home";
import React, { Suspense } from "react";
import SkeletonLoading from "./loading";
import useAuthenticate from "@/common/hooks/useAuthenticate";
import LoadingUI from "@/common/components/ui/LoadingUI";

const Dashboard: React.FC = () => {
  const isAuthenticated = useAuthenticate();

  if (!isAuthenticated || isAuthenticated === null) {
    return <LoadingUI />;
  }

  return (
    <>
      <Suspense fallback={<SkeletonLoading />}>
        <MainGrid />
      </Suspense>
    </>
  );
};

export default Dashboard;
