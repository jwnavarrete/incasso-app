export interface InvitationCompany {
    id: string;
    invitedEmail: string;
    invitedCompany: string;
    country: string;
    invitingCompanyId: string;
    invitationToken: string;
    status: string;
    sentAt: string; // ISO date string
    acceptedAt: string | null; // ISO date string or null
    expiresAt: string | null; // ISO date string
}     