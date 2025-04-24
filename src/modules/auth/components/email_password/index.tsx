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
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/modules/auth/validations/signIn.schema";
import InputHookForm from "@/common/components/ui/InputHookForm";
import { iSignIn } from "@/modules/auth/interfaces/auth.interface";
import { useAuthContext } from "@/modules/auth/context/authContext";
import { ErrorHandler } from "@/common/lib/errors";
import { notifySuccess } from "@/common/lib/notifications";
import { setAuthSession } from "@/common/lib/session";
import useClientRouter from "@/common/hooks/useNavigations";
import LogoComponent from "@/common/components/ui/LogoComponent";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LoadingUI from "@/common/components/ui/LoadingUI";

const EmailPasswordComponent: React.FC = () => {
  const router = useRouter();
  const { signIn, loading } = useAuthContext();
  const { t } = useTranslation("auth");
  const [client, setClient] = React.useState(false);
  const [subdomain, setSubdomain] = React.useState<string | null>(null);

  const { redirectTo } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(signInSchema),
  });

  const { handleSubmit } = methods;

  const getSubdomain = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];
      return subdomain;
    }
    return null;
  };

  useEffect(() => {
    setClient(true);
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      methods.setValue("email", emailParam);
    }
    setSubdomain(getSubdomain());
  }, []);

  if (!client) {
    return <LoadingUI />;
  }

  const handleAuth = async (data: iSignIn) => {
    try {
      if (subdomain) {
        data.subdomain = subdomain;
      }
      // Llamada al signIn
      const tokens = await signIn(data);

      notifySuccess("Sign in success");
      setAuthSession(tokens);

      redirectTo("/");
    } catch (error) {
      ErrorHandler.showError(error, true);
    }
  };

  const hanleLoginAnotherAccount = () => {
    router.push(
      `https://auth.${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/login_company`
    );
  };

  return (
    <Container component="main" maxWidth="md">
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

        <Typography component="h2" variant="h2">
          {t("sign_in")}
        </Typography>
        <Typography variant="body2">{subdomain}</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleAuth)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormProvider {...methods}>
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12}>
                <InputHookForm name="email" required label={t("email")} />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm
                  name="password"
                  required
                  type="password"
                  label={t("password")}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Button
                  component={Link}
                  href="forgot_password"
                  variant="text"
                  style={{ textDecoration: "none", textTransform: "none" }}
                >
                  {t("login_email_password.forgot_password")}
                </Button>
              </Grid>
            </Grid>

            <Button
              type="submit"
              loading={loading}
              variant="contained"
              loadingPosition="start"
              fullWidth
            >
              {t("sign_in")}
            </Button>
          </FormProvider>
        </Box>
      </Box>

      <Box sx={{ width: "100%", mt: 5 }}>
        <Divider />
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t("login_email_password.invitation_info")} {subdomain}
        {t("login_email_password.invitation_inf2")}
      </Typography>

      <Box sx={{ width: "100%", mt: 2 }}></Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Divider />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="text"
          onClick={hanleLoginAnotherAccount}
          style={{ textDecoration: "none", textTransform: "none" }}
        >
          {t("login_email_password.login_another_account")}
        </Button>
      </Box>
    </Container>
  );
};

export default EmailPasswordComponent;
