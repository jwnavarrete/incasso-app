"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/common/store/global.store";


const useAuthenticate = () => {
    const isAuthenticated = useSelector((state: AppState) => state.isAuthenticated) ?? null;
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);        
    }, [isAuthenticated, isClient]);

    return isAuthenticated;
};

export default useAuthenticate;