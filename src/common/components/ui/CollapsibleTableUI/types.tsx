import React from "react";

export interface CollapsibleTableRow {
    id: string | number;
    [key: string]: any;
    details?: any[];
}

export interface CollapsibleTableColumn {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: any) => React.ReactNode;
}

export interface CollapsibleTableProps {
    columns: CollapsibleTableColumn[];
    data: CollapsibleTableRow[];
    actions?: ({ row }: { row: CollapsibleTableRow }) => React.ReactNode;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}
