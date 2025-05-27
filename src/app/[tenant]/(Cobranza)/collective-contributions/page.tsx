"use client";
import React, { Suspense } from "react";
import SkeletonLoading from "../../loading";
import useAuthenticate from "@/hooks/useAuthenticate";
import LoadingUI from "@/components/ui/LoadingUI";
import CollectionContributionComponent from "./components";

const CollectiveContributionsPage: React.FC = () => {

    const isAuthenticated = useAuthenticate();
    if (!isAuthenticated || isAuthenticated === null) {
        return <LoadingUI />;
    }

    return (
        <>
            <Suspense fallback={<SkeletonLoading />}>
                <CollectionContributionComponent />                
            </Suspense>
        </>
    );
};

export default CollectiveContributionsPage;