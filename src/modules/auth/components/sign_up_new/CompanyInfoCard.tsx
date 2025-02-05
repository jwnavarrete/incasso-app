import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyInfoSchema } from "@/modules/auth/validations/signUpSchema";
import { useForm, FormProvider } from "react-hook-form";
import InputHookForm from "@/common/components/ui/InputHookForm";
import Card from "@mui/material/Card";
import { useAuthContext } from "@/modules/auth/context/authContext";
import ActionButtons from "./ActionButons";
import RangeHookForm from "@/common/components/ui/RangeHookForm";
import SelectHookForm from "@/common/components/ui/SelectHookForm";
import { countryOptions } from "@/common/utils/catalogo/CountryList";
import { bonaireCompanyTypes } from "@/common/utils/catalogo/BonaireCompanyTypes";
import HeaderInfoCard from "./HeaderInfoCard";
import OnboardingLayout from "@/common/components/layout/OnboardingLayout";

export default function AccountInfoCard() {
  const { signUpData } = useAuthContext();
  const urlImage = "/static/images/auth/sign_up_2.jpg";
  
  const methods = useForm({
    resolver: yupResolver(companyInfoSchema),
  });

  const { reset } = methods;

  useEffect(() => {
    if (signUpData.company) {
      reset(signUpData.company);
    }
  }, [signUpData.company]);

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
            title="Company Information"
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
              <Grid item xs={12} lg={6}>
                <SelectHookForm
                  name="type"
                  label="Company Type"
                  options={bonaireCompanyTypes}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputHookForm name="name" required label="Company Name" />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm
                  name="contactEmail"
                  required
                  label="Contact Email"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputHookForm name="kvk" required label="Kvk Code" />
              </Grid>
              <Grid item xs={12} lg={6}>
                <SelectHookForm
                  name="country"
                  label="Country"
                  options={countryOptions}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <InputHookForm
                  name="address"
                  required
                  label="Address Company"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <RangeHookForm
                  name="numberOfEmployes"
                  label="Number of Employes"
                  ranges={["1-5", "10-20", "20-30", "40-50", "50-100", "100+"]}
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
