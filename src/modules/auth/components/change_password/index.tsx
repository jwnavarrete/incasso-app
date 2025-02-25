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
import axios from "axios";
import { resetPasswordSchema } from "@/modules/auth/validations/auth.schema";
import LoadingUI from "@/common/components/ui/LoadingUI";

const ChangePassword: React.FC = () => {
  const { redirectTo, redirectToLoginCompany } = useClientRouter();
  const [client, setClient] = React.useState(false);

  const [authParams, setAuthParams] = React.useState<IAuthParams>({
    token: null,
    userId: null,
  });

  const [loading, setLoading] = React.useState(false);

  const methods = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const handleAuth = async (data: any) => {
    try {
      if (!authParams.token || !authParams.userId) {
        throw new Error("Invalid parameters");
      }

      const param: IResetPassword = data;

      const response = await axios.post(
        "/api/proxy/reset-password/update-password",
        {
          ...param,
          ...authParams,
        }
      );
      console.log("response", response);

      notifySuccess("Password changed successfully");

      redirectTo("/");
    } catch (error) {
      ErrorHandler.showError(error, true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const dl_userid = urlParams.get("dl_userid");

    if (token && dl_userid) {
      validateResetPasswordToken(token, dl_userid);
    } else {
      redirectToLoginCompany();
    }
    setClient(true);
  }, []);

  const validateResetPasswordToken = async (token: string, userId: string) => {
    try {
      if (!token || !userId) {
        throw new Error("Invalid parameters");
      }

      setLoading(true);

      const response = await axios.post(
        "/api/proxy/reset-password/verify-token",
        {
          token,
          userId,
        }
      );
      console.log(response);

      setAuthParams({ token, userId });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ErrorHandler.showErrorWithCallback(
        "Failed to verify reset password token. Please try again or contact support.",
        () => {
          redirectToLoginCompany();
        }
      );
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
        <Box display="flex" alignItems="center">
          <Typography component="h3" variant="h3" fontWeight="bold" mr={1}>
            Change
          </Typography>
          <Typography component="h3" variant="h3">
            password
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
                <InputHookForm
                  name="password"
                  required
                  type="password"
                  label="New Password"
                />
              </Grid>
              <Grid item xs={12}>
                <InputHookForm
                  name="confirmPassword"
                  required
                  type="password"
                  label="Confirm New Password"
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
                  Change my password
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
