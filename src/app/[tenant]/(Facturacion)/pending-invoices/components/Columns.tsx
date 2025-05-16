import { CollapsibleTableColumn } from '@/components/ui/CollapsibleTableUI/types';
import { renderCollectionStatus } from '@/components/ui/RenderStatus';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const columns: CollapsibleTableColumn[] = [
    { id: 'invoiceNumber', label: 'Invoice Number', align: 'left' },
    // { id: 'customerName', label: 'Customer Name', align: 'left' },
    {
        id: 'issueDate',
        label: 'Issue Date',
        align: 'center',
        render: (value: string) => formatDate(value),
    },
    {
        id: 'invoiceAmount',
        label: 'Invoice Amount',
        align: 'right',
        render: (value: number) => formatCurrency(value),
    },
    {
        id: 'amountPaid',
        label: 'Amount Paid',
        align: 'right',
        render: (value: number) => formatCurrency(value),
    },
    // {
    //     id: 'remainingBalance',
    //     label: 'Remaining Balance',
    //     align: 'right',
    //     render: (value: number, row: any) => {
    //         console.log('row', row);
    //         return formatCurrency(value + row.feesInterest);
    //     },
    // },
    {
        id: 'feesInterest',
        label: 'Fees + Interest',
        align: 'right',
        render: (value: number) => formatCurrency(value),
    },
    {
        id: 'totalDueToday',
        label: 'Total Due Today',
        align: 'right',
        render: (value: number) => formatCurrency(value),
    },
    { id: 'receivableStatus', label: 'Status', align: 'center' },
    {
        id: 'collectionStatus',
        label: 'Collection Status',
        align: 'center',
        render: (value) => renderCollectionStatus(value),
    },
];


