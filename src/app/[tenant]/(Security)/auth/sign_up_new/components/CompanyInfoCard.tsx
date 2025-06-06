import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyInfoSchema } from "@/common/validators/auth/signUp.schema";
import { useForm, FormProvider } from "react-hook-form";
import InputHookForm from "@/components/ui/InputHookForm";
import { useAuthContext } from "@/context";
import ActionButtons from "./ActionButons";
import RangeHookForm from "@/components/ui/RangeHookForm";
import SelectHookForm from "@/components/ui/SelectHookForm";
import { CountryList } from "@/common/data/countryList";
import { bonaireCompanyTypes } from "@/common/data/bonaireCompanyTypes";
import HeaderInfoCard from "./HeaderInfoCard";
import OnboardingLayout from "@/components/layout/OnboardingLayout";
import CardContainer from "./CardContainer";

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
        <CardContainer>
          <HeaderInfoCard
            title="Company Information"
            subtitle="Enter details to continue"
            logoSrc={process.env.NEXT_PUBLIC_LOGO_URL || ""}
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
                <InputHookForm name="name" required label="Company Name"  placeholder="Company Name"/>
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
                  options={CountryList}
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
                  name="numberOfEmployees"
                  label="Number of Employes"                  
                  ranges={["1-5", "10-20", "20-30", "40-50", "50-100", "100+"]}
                />
              </Grid>

              <ActionButtons />
            </Grid>
          </Box>
        </CardContainer>
      </FormProvider>
    </OnboardingLayout>
  );
}
