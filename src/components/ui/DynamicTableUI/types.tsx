import React from "react";

export interface DynamicTableRow {
    id: string | number;
    [key: string]: any;
}

export interface DynamicColumn {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: any, row: any) => React.ReactNode;
}

export interface DynamicTableProps {
    columns: DynamicColumn[];
    data: DynamicTableRow[];
    actions?: ({ row }: { row: DynamicTableRow }) => React.ReactNode;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}
