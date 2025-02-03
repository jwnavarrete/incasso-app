import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/modules/auth/validations/signUpSchema";
import { useForm, FormProvider } from "react-hook-form";
import InputHookForm from "@/common/components/ui/InputHookForm";
import Card from "@mui/material/Card";
import { useAuthContext } from "@/modules/auth/context/authContext";
import ActionButtons from "./ActionButons";
import SelectHookForm from "@/common/components/ui/SelectHookForm";
import { typeOfIdentificationList } from "@/common/utils/catalogo/TypeOfIdentificationList";
import { countryOptions } from "@/common/utils/catalogo/CountryList";

export default function AccountInfoCard() {
  const { signUpData } = useAuthContext();

  const methods = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const { reset } = methods;

  useEffect(() => {
    if (signUpData.user) {
      reset(signUpData.user);
    }
  }, [signUpData.user]);

  return (
    <FormProvider {...methods}>
      <Card
        variant="outlined"
        sx={{ p: 4, width: "450px", flexDirection: "column" }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Create your account
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <InputHookForm name="fullname" required label="Full Name" />
            </Grid>
            <Grid item xs={12}>
              <InputHookForm name="email" required label="Email" />
            </Grid>
            <Grid item xs={12}>
              <InputHookForm
                name="password"
                // type="password"
                required
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <InputHookForm name="phone" required label="Phone Number" />
            </Grid>
            <Grid item xs={12}>
              <SelectHookForm
                name="country"
                label="Country"
                options={countryOptions}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <SelectHookForm
                name="typeIdentification"
                label="Type of Identification"
                options={typeOfIdentificationList}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InputHookForm
                name="identification"
                required
                label="Identification"
              />
            </Grid>
            <ActionButtons />
          </Grid>
        </Box>
      </Card>
    </FormProvider>
  );
}
