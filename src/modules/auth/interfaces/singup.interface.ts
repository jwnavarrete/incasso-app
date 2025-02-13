export interface IUser {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  typeIdentification: string;
  identification: string;
}

export interface ICompany {
  name: string;
  contactEmail: string;
  kvk: string;
  address: string;
  country: string;
  type: string;
  numberOfEmployees: "1-5" | "10-20" | "20-30" | "40-50" | "50-100" | "100+";
  termsAccepted: boolean;
}

export interface ITenantSignUp {
  user: IUser;
  company: ICompany;
}

export const initialTenantSignUp: ITenantSignUp = {
  user: {
    fullname: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    typeIdentification: "",
    identification: "",
  },
  company: {
    name: "",
    contactEmail: "",
    kvk: "",
    address: "",
    country: "",
    type: "",
    numberOfEmployees: "1-5",
    termsAccepted: false,
  },
};

export interface IAuthSignUpResponse {
  id: string;
  name: string;
  contactEmail: string;
  kvk: string;
  address: string;
  country: string;
  type: string;
  numberOfEmployees: "1-5" | "10-20" | "20-30" | "40-50" | "50-100" | "100+";
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  tenant: {
    id: string;
    subdomain: string;
    clientId: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    email: string;
    fullname: string;
    tenantId: string;
    country: string;
    phone: string;
    identification: string;
    typeIdentification: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    roleId: string;
  };
  accessToken: string;
  refreshToken: string;
}
