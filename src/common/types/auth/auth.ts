export interface iIdToken {
  sub: string;
  fullname: string;
  email: string;
  phone: string;
  country: string;
  typeIdentification: string;
  identification: string;
  tenantId: string;
  subdomain: string;
  company: string;
  role: string;
  emailVerified: boolean;
}

export interface iSignIn {
  email: string;
  password: string;
  subdomain?: string;
}

export interface iTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface iValidateSlugResponse {
  subdomain: string;
  isValid: boolean;
}

export interface iInviteTokenResponse {
  invitedEmail: string;
  invitedCompany: string;
  country: string;
}

export interface iUserInfo extends iIdToken {
  // Puedes agregar propiedades adicionales aquí si es necesario
}
