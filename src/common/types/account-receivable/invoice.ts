interface Debtor {
    id: string;
    tenantId: string;
    userId: string;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    personType: string;
    identificationType: string;
    identification: string;
    employeeId: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
}

interface User {
    id: string;
    tenantId: string;
    email: string;
    fullname: string;
    password: string;
    country: string | null;
    phone: string;
    typeIdentification: string | null;
    identification: string | null;
    emailVerified: boolean;
    verificationToken: string | null;
    createdAt: string;
    updatedAt: string;
    resetPasswordToken: string | null;
    joined: string;
    invitedById: string | null;
    lastActive: string | null;
    status: string;
    invitationToken: string;
    roleId: string;
}

export interface Installment {
    id: string;
    paymentAgreementId: string;
    installmentNumber: number;
    dueDate: string;
    originalAmount: number;
    amountPaid: number;
    remainingAmount: number;
    paid: boolean;
    paidAt: string | null;
    status: string;
    selected: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentAgreement {
    id: string;
    accountsReceivableId: string;
    initialPayment: number;
    remainingBalance: number;
    totalAmount: number;
    numberOfInstallments: number;
    paymentStatus: string;
    lastPaymentDate: string | null;
    initialPaymentStatus: string;
    totalPaid: number;
    isFullyPaid: boolean;
    accumulatedInterest: number;
    initialPaymentDeadline: string;
    createdAt: string;
    updatedAt: string;
    previousInterestAmount: number;
    Installments: Installment[];
}

interface PaymentDetail {
    id: string;
    accountsReceivableId: string;
    paymentDate: string;
    paymentAmount: number;
    paymentMethod: string;
    referenceNumber: string;
    notes: string;
    createdAt: string;
    updatedAt: string;
    paymentAgreementId: string;
}

export interface AccountsReceivableInvoice {
    id: string;
    tenantId: string;
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    customerName: string;
    customerAddress: string;
    customerEmail: string;
    customerPhone: string;
    invoiceAmount: number;
    amountPaid: number;
    remainingBalance: number;
    totalDueToday: number;
    receivableStatus: string;
    collectionStatus: string;
    clientCollectionPercentage: number;
    clientCollectionAmount: number;
    clientAbbPercentage: number;
    clientAbbAmount: number;
    adminCollectionPercentage: number;
    adminCollectionAmount: number;
    adminAbbPercentage: number;
    adminAbbAmount: number;
    notifiedAt: string | null;
    previousInterestAmount: number;
    interestStartDate: string | null;
    interestFrozenAt: string | null;
    interestFrozenAmount: number | null;
    interestFrozenPercentage: number | null;
    lastPaymentDate: string | null;
    debtorId: string;
    createdAt: string;
    updatedAt: string;
    hasPaymentAgreement: boolean;
    paymentAgreementId: string | null;
    notes: string;
    debtor: Debtor;
    paymentDetail: PaymentDetail[];
    paymentAgreement?: PaymentAgreement;
    totalFees: number;
    interest: number;
    feesInterest: number;
}

// Accounts Receivable


export interface AccountsReceivableImport {
    debtorFullname: string;
    debtorEmail: string;
    debtorPhone: string;
    debtorAddress: string;
    invoiceNumber: string;
    invoiceAmount: number;
    issueDate: string; // ISO date string
    dueDate: string; // ISO date string
    identification: string;
}

export interface ICollectionParameters {
    id: string;
    porcCobranza: number;
    porcAbb: number;
    diasPlazoEmpresaAanmaning: number;
    diasPlazoConsumidorAanmaning: number;
    diasPlazoEmpresaSommatie: number;
    diasPlazoConsumidorSommatie: number;
    precioEmpresaPequena: number;
    contribucionEmpresaPequenaPfc: number;
    precioEmpresaGrande: number;
    contribucionEmpresaGrandePfc: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}
