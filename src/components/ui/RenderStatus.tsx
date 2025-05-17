import { Chip } from "@mui/material";

export const renderCollectionStatus = (
    status: "aanmaning" | "ingebrekestelling" | "sommatie" | "blokkade"
) => {
    const statusColors: { [index: string]: "success" | "error" | "info" | "warning" } =
    {
        aanmaning: "success",
        sommatie: "info",
        ingebrekestelling: "warning",
        blokkade: "error",
    };

    return <Chip label={status} color={statusColors[status]} size="small" />;
};

export const renderConnectionStatus = (status: 'Online' | 'Offline') => {
    const statusColors: { [index: string]: 'success' | 'default' } = {
        Online: 'success',
        Offline: 'default',
    };

    return <Chip label={status} color={statusColors[status]} size="small" />;
};
