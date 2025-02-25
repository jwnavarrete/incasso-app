"use client";
import React, { Suspense } from "react";
import MainGrid from "@/common/components/dashboard";
import HomeComponent from "@/common/components/home";
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
        <HomeComponent />
      </Suspense>
    </>
  );
};

export default Dashboard;
