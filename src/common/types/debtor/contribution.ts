import { IDebtorBasicInfo } from "./debtor";

export interface IQueryParams {
    status?: "pending" | "verified" | "rejected" | "contributed" | "accepted";
    debtorId?: string;
}

export interface IContribution {
    id: string;
    debtorId: string;
    debtor: IDebtorBasicInfo;
    companyId: string;
    companyName: string;
    companyContact: string;
    companyEmail: string;
    companyPhone: string;
    extraInfo: string;
    verificationStatus: string;
    createdByUserId: string;
    notes: string;
    isPublic: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface IPartialCompanyContribution {
    companyName?: string | null;
    companyContact?: string | null;
    companyEmail?: string | null;
    companyPhone?: string | null;
    extraInfo?: string | null;
}

export type IContributionList = IContribution[];