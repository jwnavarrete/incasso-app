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
    render?: (value: any, row: any) => React.ReactNode;
}

export interface CollapsibleTableProps {
    columns: CollapsibleTableColumn[];
    data: CollapsibleTableRow[];
    detailsTitle?: string; // Title for the details section
    detailsViewType?: 'table' | 'list'; // 'table' or 'list'
    actions?: ({ row }: { row: CollapsibleTableRow }) => React.ReactNode;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}
