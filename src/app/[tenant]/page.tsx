"use client";
import React, { Suspense } from "react";
import HomeComponent from "@/components/home";
import SkeletonLoading from "./loading";
import useAuthenticate from "@/hooks/useAuthenticate";
import LoadingUI from "@/components/ui/LoadingUI";

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
