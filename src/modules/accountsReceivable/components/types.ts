export interface AccountsReceivable {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  issueDate: string; // ISO date string
  dueDate: string; // ISO date string
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  customerPhone: string;
  invoiceAmount: number;
  amountPaid: number;
  outstandingBalance: number;
  receivableStatus: "pending" | "paid" | "overdue"; // Example statuses
  collectionStatus: "initial" | "in-progress" | "completed"; // Example statuses
  notes: string;
  collectionPercentage: number;
  abbPercentage: number;
  debtorId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  debtor: Debtor;
  paymentDetail: PaymentDetail[];
}

export interface Debtor {
  id: string;
  tenantId: string;
  userId: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  identification: string;
  employeeId: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PaymentDetail {
  // Define fields for payment details if available
}

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
