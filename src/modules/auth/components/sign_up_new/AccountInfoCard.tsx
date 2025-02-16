import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/modules/auth/validations/signUp.schema";
import { useForm, FormProvider } from "react-hook-form";
import InputHookForm from "@/common/components/ui/InputHookForm";
import { useAuthContext } from "@/modules/auth/context/authContext";
import ActionButtons from "./ActionButons";
import SelectHookForm from "@/common/components/ui/SelectHookForm";
import { typeOfIdentificationList } from "@/common/utils/catalogo/TypeOfIdentificationList";
import { countryOptions } from "@/common/utils/catalogo/CountryList";
import HeaderInfoCard from "./HeaderInfoCard";
import OnboardingLayout from "@/common/components/layout/OnboardingLayout";
import Link from "next/link";
import { Button, Typography } from "@mui/material";
import CardContainer from "./CardContainer";

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
        <CardContainer>
          <HeaderInfoCard
            title="User Information"
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
              <Grid item xs={12}>
                <InputHookForm name="fullname" required label="Full Name" />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm name="email" required label="Email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputHookForm
                  name="password"
                  type="password"
                  required
                  label="Password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputHookForm
                  name="confirmPassword"
                  type="password"
                  required
                  label="Confirm Password"
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
        </CardContainer>
      </FormProvider>

      <Box
        sx={{
          mt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <span>Don't have an account yet?</span>
          <Link href="/auth/login_company" passHref>
            <Button variant="text">login</Button>
          </Link>
        </Typography>
      </Box>
    </OnboardingLayout>
  );
}
