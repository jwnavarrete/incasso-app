import React from 'react';
import CollapsibleTableUI from './index';
import { CollapsibleTableColumn } from './types';
import Button from '@mui/material/Button';
import ActionsListUI from '../ActionsListUI';
import { GridMoreVertIcon } from '@mui/x-data-grid';

const Example: React.FC = () => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    const columns: CollapsibleTableColumn[] = [
        { id: 'invoiceNumber', label: 'Invoice Number', align: 'left' },
        { id: 'customerName', label: 'Customer Name', align: 'left' },
        { id: 'issueDate', label: 'Issue Date', align: 'center' },
        {
            id: 'invoiceAmount',
            label: 'Invoice Amount',
            align: 'right',
            render: (value: number) => formatCurrency(value)
        },
        {
            id: 'amountPaid',
            label: 'Amount Paid',
            align: 'right',
            render: (value: number) => formatCurrency(value)
        },
        {
            id: 'feesInterest',
            label: 'Fees + Interest',
            align: 'right',
            render: (value: number) => formatCurrency(value)
        },
        {
            id: 'totalDueToday',
            label: 'Total Due Today',
            align: 'right',
            render: (value: number) => formatCurrency(value)
        },
        { id: 'status', label: 'Status', align: 'center' },
    ];

    const data = [
        {
            id: 1,
            invoiceNumber: 'INV-001',
            customerName: 'John Doe',
            issueDate: '2023-01-01',
            dueDate: '2023-01-15',
            invoiceAmount: 1000,
            amountPaid: 200,
            feesInterest: 50,
            totalDueToday: 850,
            status: 'Pending',
            details: [
                { interest: '5%', fees: formatCurrency(50), description: 'Late payment fee' },
            ],
        },
        {
            id: 2,
            invoiceNumber: 'INV-002',
            customerName: 'Jane Smith',
            issueDate: '2023-02-01',
            dueDate: '2023-02-15',
            invoiceAmount: 2000,
            amountPaid: 2000,
            feesInterest: 0,
            totalDueToday: 0,
            status: 'Paid',
        },
        {
            id: 3,
            invoiceNumber: 'INV-003',
            customerName: 'Alice Johnson',
            issueDate: '2023-03-01',
            dueDate: '2023-03-15',
            invoiceAmount: 1500,
            amountPaid: 500,
            feesInterest: 75,
            totalDueToday: 1075,
            status: 'Overdue',
            details: [
                { interest: '5%', fees: formatCurrency(75), description: 'Late payment fee' },
            ],
        },
    ];

    const actions = (row: any) => {
        const actionsList = [
            {
                title: 'Register Payment',
                onClick: () => {
                    alert(`Registering payment for invoice ${row.invoiceNumber}`);
                    // console.log('View Details clicked for', params.row);
                },
            },
        ];

        return (
            <ActionsListUI
                buttonIcon={<GridMoreVertIcon />}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                actions={actionsList}
            />
        );
    };



    return (
        <>
            <div style={{ width: '100%' }}>
                <CollapsibleTableUI columns={columns} data={data} actions={actions} />
            </div>
        </>
    );
};

export default Example;