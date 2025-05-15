import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const useLoadingNavigate = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        handleStop();

        return () => {
            handleStart();
        };
    }, [pathname, searchParams]);

    return isLoading;
};

export default useLoadingNavigate;
