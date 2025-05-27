import { CollapsibleTableColumn } from "@/components/ui/CollapsibleTableUI/types";
import { Typography } from "@mui/material";
import { Chip } from "@mui/material";

const renderText = (text: string) => {
    return (
        <Typography variant="body2" noWrap>
            {text}
        </Typography>
    );
}

const statusColorMap: Record<string, "default" | "primary" | "success" | "warning" | "error" | "info"> = {
    pending: "warning",
    verified: "success",
    rejected: "error",
    contributed: "primary",
    accepted: "info",
};

const renderStatus = (status?: "pending" | "verified" | "rejected" | "contributed" | "accepted") => {
    if (!status) return null;
    const color = statusColorMap[status] || "default";
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return <Chip label={label} color={color} size="small" />;
};

export const columns: CollapsibleTableColumn[] = [
    {
        id: 'debtor-fullname',
        label: 'Full Name',
        align: 'left',
        render(value, row) {
            return renderText(row?.debtor?.fullname)
        },
    },
    {
        id: 'debtor-person-type',
        label: 'Person Type',
        align: 'left',
        render(value, row) {
            return renderText(row?.debtor?.personType);
        }
    },
    {
        id: 'debtor-identification-type',
        label: 'Identification Type',
        align: 'left',
        render(value, row) {
            return renderText(row?.debtor?.identificationType);
        }
    },
    {
        id: 'verificationStatus',
        label: 'Verification Status',
        align: 'left',
        render(value, row) {
            return renderStatus(value);
        }
    }
];