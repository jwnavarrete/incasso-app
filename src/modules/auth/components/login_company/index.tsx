"use client";
import React, { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { GrLinkNext } from "react-icons/gr";
import useClientRouter from "@/common/hooks/useNavigations";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../validations/auth.schema";
import InputHookForm from "@/common/components/ui/InputHookForm";
import CurrentAccount from "../current_account";
import axios from "axios";
import { ErrorHandler } from "@/common/lib/errors";
import { notifyWarning } from "@/common/lib/notifications";
import LogoComponent from "@/common/components/ui/LogoComponent";
import useTranslation from "@/common/hooks/useTranslation";
import LoadingUI from "@/common/components/ui/LoadingUI";

const LoginCompany: React.FC = () => {
  const { redirectToSignUp, redirectTo } = useClientRouter();
  const { t } = useTranslation("auth");
  const [client, setClient] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return <LoadingUI />;
  }

  const handleAuth = async (data: any) => {
    // validamos el email y si es correcto redirigimos a la siguiente pantalla
    try {
      const response = await axios.post("/api/proxy/auth/validate-email", {
        email: data.email,
      });
      if (response.data.exists) {
        redirectTo("/auth/login_company/enter_slug");
      } else {
        notifyWarning("We couldn't find this email. Would you like to");
      }
    } catch (error) {
      console.log(error);
      ErrorHandler.showError(error, true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoComponent />

          <Typography component="h2" variant="h4">
            {/* Log in to your account */}
            {t("login_company.title")}
          </Typography>

          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(handleAuth)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container mt={0.5}>
                <Grid item xs={12}>
                  <InputHookForm
                    name="email"
                    required
                    label={t("login_company.email")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                    endIcon={<GrLinkNext />}
                    style={{ textDecoration: "none", textTransform: "none" }}
                  >
                    {t("next_button")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
        </Box>

        <Box sx={{ width: "100%", mt: 5 }}>
          <Divider />
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {t("login_company.no_account")}
          <Button variant="text" onClick={redirectToSignUp}>
            {t("register")}
          </Button>
        </Typography>
      </Container>

      <CurrentAccount />
    </>
  );
};

export default LoginCompany;
