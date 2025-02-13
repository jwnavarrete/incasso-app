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
import StartIcon from "@mui/icons-material/Start";
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

const LoginCompany: React.FC = () => {
  const { redirectToSignUp, redirectTo } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {}, []);

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
      ErrorHandler.showError("Invalid email or password", true);
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

          {/* <Image
          src={process.env.NEXT_PUBLIC_LOGO_URL || ""}
          alt={"Logo"}
          width={120}
          height={70}
        /> */}

          <Typography component="h2" variant="h4">
            Log in to your account
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
                    label="Enter your work email"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                    endIcon={<StartIcon />}
                  >
                    Next
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
          Don't have an account yet?
          <Button variant="text" onClick={redirectToSignUp}>
            Sign up
          </Button>
        </Typography>
      </Container>

      <CurrentAccount />
    </>
  );
};

export default LoginCompany;
