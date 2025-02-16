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

const ForgotPassword: React.FC = () => {
  const { loading } = useAuthContext();
  const [subdomain, setSubdomain] = React.useState<string | null>(null);

  const { redirectToLoginCompany } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
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
      ErrorHandler.showError(error, true);
    }
  };

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
            Forgot
          </Typography>
          <Typography component="h3" variant="h3">
            your password?
          </Typography>
        </Box>

        <Typography component="h5" variant="body2" mt={2}>
          We'll email you instructions on how to reset your password.
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
                  placeholder="Your email address here..."
                  label="Your email address"
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
                  Reset Password
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
          Back to login page
        </Button>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
