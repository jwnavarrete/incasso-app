export interface PaymentDetails {
    invoiceId: string;
    paymentAmount: number;
    paymentMethod: string;
    referenceNumber: string;
    notes: string;
    installmentIds?: string[]; // Optional, if not present, payment goes to the total
    initialPaymentStatus?: string | null; // Optional
    initialPayment?: number | null; // Optional
};

interface PaymentDetailsResponse {
    id: string;
    accountsReceivableId: string;
    paymentDate: string; // ISO date string
    paymentAmount: number;
    paymentMethod: string;
    referenceNumber: string;
    notes: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    paymentAgreementId: string | null;
}


// Acuerdo de pago

export interface RegisterPaymentAgreement {
    initialPayment: number;
    initialPaymentDeadline: string; // ISO date string
    installments: number;
    installmentsDetail: {
        installmentNumber: number;
        amount: string;
        dueDate: string; // ISO date string
    }[];
    frequency: string;
    invoiceId?: string; // Optional
    totalAmount: number;
}