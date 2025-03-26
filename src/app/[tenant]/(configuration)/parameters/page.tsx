"use client";
import React, { useState } from "react";
import DynamicTabsUI from "@/common/components/ui/DynamicTabsUI";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Button, Card, CardActions, CardContent, Divider } from "@mui/material";
import DynamicOutlinedInput from "@/common/components/ui/OutlinedInput";
import { AppState } from "@/common/store/global.store";
import { ROLES } from "@/common/lib/constant";

const HelloWorld: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useSelector((state: AppState) => state.user);

  const tabs = [
    {
      label: "Parametros General",
      value: "parametros-general",
      content: <ParametrosComponent />,
      roles: [ROLES.SUPER_ADMIN], // Roles permitidos
    },
    {
      label: "Registro",
      value: "registro",
      content: <RegistroComponent />,
      roles: [ROLES.SUPER_ADMIN], // Solo visible para admin
    },
    {
      label: "Parametros de Cobro",
      value: "parametros-cobro",
      content: <CobroComponent />,
      roles: [ROLES.TENANT_ADMIN], // Roles permitidos
    },
  ];

  // Filtrar tabs según el rol del usuario
  const filteredTabs = tabs.filter(
    (tab) => user?.role && tab.roles.includes(user.role)
  );

  return (
    <Box width="100%" textAlign="left">
      <Box mt={4}>
        <Card>
          <CardContent>
            <DynamicTabsUI
              tabs={filteredTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button size="small" variant="contained">
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

const ParametrosComponent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">Porcentaje de Cobranza</Divider>
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="porc_cobranza"
            label="% Cobranza"
            defaultValue="15"
            adornment="%"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="porc_abb"
            label="% ABB"
            defaultValue="6"
            adornment="%"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider textAlign="left">Plazos de pago</Divider>
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="plazo_empresa"
            label="Empresa (Aanmaning)"
            defaultValue="5"
            adornment="días"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="plazo_consumidores"
            label="Consumidores (Aanmaning)"
            defaultValue="14"
            adornment="días"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="plazo_empresa"
            label="Empresa (Sommatie)"
            defaultValue="2"
            adornment="días"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="plazo_consumidores"
            label="Consumidores (Sommatie)"
            defaultValue="2"
            adornment="días"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const RegistroComponent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider textAlign="left">Empresa Pequeña</Divider>
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="precio_empresa_pequena"
            label="Precio Empresa"
            defaultValue="250"
            adornment="$"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="contribucion_pfc_pequena"
            label="Contribucion PFC"
            defaultValue="100"
            adornment="$"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider textAlign="left">Empresa Grande</Divider>
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="precio_empresa_grande"
            label="Precio Empresa"
            defaultValue="400"
            adornment="$"
          />
        </Grid>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="contribucion_pfc_grande"
            label="Contribucion PFC"
            defaultValue="150"
            adornment="$"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const CobroComponent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DynamicOutlinedInput
            id="poc_interes"
            label="Porcentaje de interes"
            defaultValue="3"
            adornment="%"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HelloWorld;
