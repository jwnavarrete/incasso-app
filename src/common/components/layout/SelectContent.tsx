import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { FaHome } from "react-icons/fa";

import api from "@/common/lib/axiosInstance";
import {
  Tenant,
  TenantsResponse,
} from "@/modules/auth/interfaces/tenant.interface";
import { getClientSessionByCode } from "@/common/lib/session";
import useClientRouter from "@/common/hooks/useNavigations";
import { useSelector } from "react-redux";
import { AppState } from "@/common/store/global.store"; // Adjust the import path as necessary

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [company, setCompany] = React.useState("");
  const [tenants, setTenants] = React.useState<Tenant[] | null>(null);
  const { redirectToSlug } = useClientRouter(); // Usamos el hook aquí, dentro del componente
  const user = useSelector((state: AppState) => state.user);

  React.useEffect(() => {
    api.get("/tenant?email=" + user?.email).then((response) => {
      const data: TenantsResponse = response.data;
      setTenants(data.tenants);

      if (data.tenants?.length > 0) {
        const subdomain = getSubdomainFromUrl();

        // const activeTenant = getClientSessionByCode("active_account_slugs");
        if (subdomain) {
          setCompany(subdomain); // Selecciona el primer tenant por defecto
        }
      }
    });
  }, []);

  const getSubdomainFromUrl = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    if (parts.length > 2) {
      return parts[0];
    }
    return null;
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value) {
      redirectToSlug(event.target.value); // Usamos la función aquí
    }
    // setCompany(event.target.value as string);
  };

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select company" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        mt: user?.emailVerified ? 0 : 7,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
      {tenants?.map((tenant) => (
        <MenuItem key={tenant.id} value={tenant.subdomain}>
          <ListItemAvatar>
            <Avatar alt={tenant.client.name}>
              <FaHome />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={tenant.client.name}
            secondary={tenant.subdomain}
          />
        </MenuItem>
      ))}
    </Select>
  );
}
