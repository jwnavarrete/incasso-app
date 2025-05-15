export interface IClient {
    name: string;
    contactEmail: string;
}

export interface ITenant {
    subdomain: string;
    client?: IClient;
}

export interface IRole {
    id: string;
    name: string;
    description: string;
}

export interface InvitedBy {
    email: string;
    fullname: string;
    tenant?: ITenant;
}

export interface IUser {
    id: string;
    tenantId: string;
    tenant?: ITenant;
    email: string;
    fullname?: string;
    password?: string;
    country?: string | null;
    phone?: string | null;
    typeIdentification?: string | null;
    identification?: string | null;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    verificationToken?: string | null;
    resetPasswordToken?: string;
    invitationToken?: string | null;
    invitedById?: string | null;
    role?: IRole;
    invitedBy?: InvitedBy | null;
    joined?: Date | null;
    lastActive?: Date | null;
    status?: string | null;
}

export interface IUserUpdate {
    status?: "active" | "inactive" | "pending" | "cancelled";
    email?: string;
    roleId?: string;
    invitationToken?: string;
    password?: string;
    fullname?: string;
    country?: string;
    phone?: string;
    typeIdentification?: string;
    identification?: string;
}

export interface IRegisterInvitedUser {
    token: string;
    userId: string;
    fullname: string;
    password: string;
}

export interface IUsersResponse {
    data: IUser[];
    total: number;
    page: number;
    limit: number;
}
