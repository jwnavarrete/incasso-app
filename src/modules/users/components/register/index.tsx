"use client";
import React, { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputHookForm from "@/common/components/ui/InputHookForm";
import { ErrorHandler } from "@/common/lib/errors";
import { notifySuccess } from "@/common/lib/notifications";
import useClientRouter from "@/common/hooks/useNavigations";
import { registerUserSchema } from "@/modules/users/validations/user.schema";
import { useUserContext } from "@/modules/users/context/userContext";
import { IRegisterInvitedUser } from "@/modules/users/interfaces/user.interface";

const ChangePassword: React.FC = () => {
  const { redirectTo, redirectToLoginCompany } = useClientRouter();
  const { loading, registerUser, verifyInvitationToken } = useUserContext();

  const [authParams, setAuthParams] = React.useState<IAuthParams>({
    token: null,
    userId: null,
  });

  const methods = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const { handleSubmit } = methods;

  const handleAuth = async (data: any) => {
    try {
      if (!authParams.token || !authParams.userId) {
        throw new Error("Invalid parameters");
      }

      const param: IRegisterInvitedUser = data;

      const response = await registerUser({
        ...param,
        userId: authParams.userId,
        token: authParams.token,
      });

      console.log("response", response);
      notifySuccess("Password changed successfully");
      redirectTo("/");
    } catch (error) {
      console.log(error);
      ErrorHandler.showError(error, true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const dl_userid = urlParams.get("dl_userid");

    if (token && dl_userid) {
      validateToken(token, dl_userid);
    } else {
      redirectToLoginCompany();
    }
  }, []);

  const validateToken = async (token: string, userId: string) => {
    try {
      if (!token || !userId) {
        throw new Error("Invalid parameters");
      }
      const response = await verifyInvitationToken(userId, token);
      console.log(response);
      setAuthParams({ token, userId });
    } catch (error) {
      ErrorHandler.showErrorWithCallback(
        "Failed to verify invitation token. Please try again or contact support.",
        () => {
          redirectToLoginCompany();
        }
      );
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
        <Box display="flex" alignItems="center">
          <Typography component="h3" variant="h3" fontWeight="bold" mr={1}>
            Register
          </Typography>
          <Typography component="h3" variant="h3">
            account
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(handleAuth)}
          noValidate
          sx={{ mt: 1 }}
        >
          <FormProvider {...methods}>
            <Grid container spacing={2} mt={0.5}>
              <Grid item xs={12}>
                <InputHookForm name="fullname" required label="Full Name" />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm
                  name="password"
                  required
                  type="password"
                  label="Password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  loading={loading}
                  variant="contained"
                  loadingPosition="start"
                  fullWidth
                  style={{ textTransform: "none" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
