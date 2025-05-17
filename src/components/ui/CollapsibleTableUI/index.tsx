'use client';
import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
} from '@mui/material';
import { CollapsibleTableProps } from './types';

const CollapsibleTableUI: React.FC<CollapsibleTableProps> = ({
    columns,
    data,
    actions,
    detailsTitle = 'Details',
    detailsViewType = 'list', // 'table' or 'list'
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
}) => {
    const [openRows, setOpenRows] = useState<Record<string | number, boolean>>({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    const handleToggleRow = (id: string | number) => {
        setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

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
                            <TableCell />
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
                                    <TableCell>
                                        {row.details && (
                                            <IconButton size="small" onClick={() => handleToggleRow(row.id)}>
                                                {openRows[row.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        )}
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align || 'left'}>
                                            {column.render ? column.render(row[column.id], row) : row[column.id]}
                                        </TableCell>
                                    ))}
                                    {actions && <TableCell align="center">{actions({ row })}</TableCell>}
                                </TableRow>
                                {row.details && (
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 2}>
                                            <Collapse in={openRows[row.id]} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom>
                                                        {detailsTitle}
                                                    </Typography>
                                                    {detailsViewType === 'table' ? (
                                                        <Table size="small" style={{ width: 'auto' }}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    {Object.keys(row.details[0] || {}).map((key) => (
                                                                        <TableCell key={key}>{key}</TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {row.details.map((detail: Record<string, any>, index: number) => (
                                                                    <TableRow key={index}>
                                                                        {Object.values(detail).map((value, idx) => (
                                                                            <TableCell key={idx}>{String(value)}</TableCell>
                                                                        ))}
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    ) : (
                                                        <Box>
                                                            {Object.entries(row.details[0] || {}).map(([key, value]) => (
                                                                <Typography key={key} variant="body2">
                                                                    <strong>{key}:</strong> {String(value)}
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                )}
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

export default CollapsibleTableUI;