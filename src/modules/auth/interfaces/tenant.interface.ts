interface Client {
  name: string;
  type: string;
  kvk: string;
  contactEmail: string;
  numberOfEmployees: string;
  country: string;
  address: string;
}

interface Tenant {
  id: string;
  subdomain: string;
  client: Client;
}

interface TenantsResponse {
  tenants: Tenant[];
}

export type { Tenant, TenantsResponse };
