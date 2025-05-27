'use client';
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import { DynamicTableProps } from './types';

const DynamicTableUI: React.FC<DynamicTableProps> = ({
    columns,
    data,
    actions,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || 'left'}>
                                    {column.label}
                                </TableCell>
                            ))}
                            {actions && <TableCell align="center">Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <React.Fragment key={row.id}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align || 'left'}>
                                            {column.render ? column.render(row[column.id], row) : row[column.id]}
                                        </TableCell>
                                    ))}
                                    {actions && <TableCell align="center">{actions({ row })}</TableCell>}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default DynamicTableUI;