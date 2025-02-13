"use client";
import React, { Suspense } from "react";
import useAuthenticate from "@/common/hooks/useAuthenticate";
import LoadingUI from "@/common/components/ui/LoadingUI";
import Link from "next/link";

const Demo: React.FC = () => {
  const isAuthenticated = useAuthenticate();

  if (!isAuthenticated || isAuthenticated === null) {
    return <LoadingUI />;
  }

  return (
    <>
      <Suspense fallback={<LoadingUI />}>
        <h1>Demo page</h1>
        <Link href="/">Go to Home</Link>
      </Suspense>
    </>
  );
};

export default Demo;
