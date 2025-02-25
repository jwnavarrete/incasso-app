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

import Image from "next/image";
import useClientRouter from "@/common/hooks/useNavigations";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/modules/auth/validations/auth.schema";
import InputHookForm from "@/common/components/ui/InputHookForm";
import { useAuthContext } from "@/modules/auth/context/authContext";
import { ErrorHandler } from "@/common/lib/errors";
import { notifyInfo } from "@/common/lib/notifications";
import axios from "axios";
import useTranslation from "@/common/hooks/useTranslation";
import LoadingUI from "@/common/components/ui/LoadingUI";

const ForgotPassword: React.FC = () => {
  const { loading } = useAuthContext();
  const [subdomain, setSubdomain] = React.useState<string | null>(null);
  const [client, setClient] = React.useState(false);
  const { t } = useTranslation("auth");

  const { redirectToLoginCompany } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    setClient(true);
    setSubdomain(getSubdomain());
  }, []);

  const getSubdomain = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];
      return subdomain;
    }
    return null;
  };

  const handleAuth = async (data: any) => {
    try {
      try {
        const param = {
          email: data.email,
          slug: subdomain,
        };

        const response = await axios.post(
          "/api/proxy/reset-password/send-email",
          param
        );

        const { message } = response.data;
        notifyInfo(message);
      } catch (error) {
        ErrorHandler.handle(error);
      }
    } catch (error) {
      ErrorHandler.showError(error, true);
    }
  };

  if (!client) {
    return <LoadingUI />;
  }

  return (
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
        <Image
          src={process.env.NEXT_PUBLIC_LOGO_URL || ""}
          alt={"Logo"}
          width={120}
          height={70}
        />

        <Box display="flex" alignItems="center">
          <Typography component="h3" variant="h3" fontWeight="bold" mr={1}>
            {t("forgot_password_page.title.part1")}
          </Typography>
          <Typography component="h3" variant="h3">
            {t("forgot_password_page.title.part2")}
          </Typography>
        </Box>

        <Typography component="h5" variant="body2" mt={2}>
          {t("forgot_password_page.subtitle")}
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleAuth)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <InputHookForm
                  name="email"
                  required
                  fullWidth
                  placeholder={t("forgot_password_page.email_placeholder")}
                  label={t("forgot_password_page.email_label")}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  loading={loading}
                  variant="contained"
                  loadingPosition="start"
                  endIcon={<GrLinkNext />}
                  style={{ textDecoration: "none", textTransform: "none" }}
                  fullWidth
                >
                  {t("forgot_password_page.reset_password_button")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Box>

      <Box sx={{ width: "100%", mt: 5 }}>
        <Divider />
      </Box>

      <Grid item xs={12} mt={1} display="flex" justifyContent="center">
        <Button
          onClick={redirectToLoginCompany}
          variant="text"
          sx={{ textTransform: "none" }}
        >
          {t("forgot_password_page.back_to_login")}
        </Button>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
