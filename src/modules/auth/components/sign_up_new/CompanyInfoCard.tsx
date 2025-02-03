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

export default function AccountInfoCard() {
  const { signUpData } = useAuthContext();

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
          Company Information
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
              <InputHookForm name="address" required label="Address Company" />
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
  );
}
