import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import HeaderInfoCard from "./HeaderInfoCard";
import OnboardingLayout from "@/common/components/layout/OnboardingLayout";

export default function AccountInfoCard() {
  const { signUpData } = useAuthContext();
  const urlImage = "/static/images/auth/sign_up.jpg";

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
    <OnboardingLayout backgroundImageUrl={urlImage}>
      <FormProvider {...methods}>
        <Card
          variant="outlined"
          sx={{
            p: 4,
            width: "450px",
            height: "auto", // Altura definida
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto", // Activar scroll si el contenido crece
          }}
        >
          <HeaderInfoCard
            title="User Information"
            subtitle="Enter details to continue"
            logoSrc="/static/LogoCIO.png"
          />

          <Box
            component="form"
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12}>
                <InputHookForm name="fullname" required label="Full Name" />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm name="email" required label="Email" />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm name="password" required label="Password" />
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
    </OnboardingLayout>
  );
}
