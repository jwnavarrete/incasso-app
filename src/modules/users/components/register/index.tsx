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
import { notifySuccess, notifyWarning } from "@/common/lib/notifications";
import useClientRouter from "@/common/hooks/useNavigations";
import { registerUserSchema } from "@/modules/users/validations/user.schema";
import { useUserContext } from "@/modules/users/context/userContext";
import { IRegisterInvitedUser } from "@/modules/users/interfaces/user.interface";
import { decrypt } from "@/common/lib/encryption";
import Link from "next/link";

const ChangePassword: React.FC = () => {
  const { redirectTo, redirectToLoginCompany, redirectToSlugLoginCompany } =
    useClientRouter();
  const { loading, registerUser, verifyInvitationToken } = useUserContext();

  const [authParams, setAuthParams] = React.useState<IAuthParams>({
    token: null,
    userId: null,
    slug: null,
  });

  const methods = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const { handleSubmit, setValue } = methods;

  const handleAuth = async (data: any) => {
    try {
      console.log(authParams);
      if (
        !authParams.token ||
        !authParams.userId ||
        !authParams.token ||
        !authParams.slug
      ) {
        throw new Error("Invalid parameters");
      }

      const param: IRegisterInvitedUser = data;

      const response = await registerUser({
        ...param,
        token: authParams.token,
        userId: authParams.userId,
      });

      // console.log("response", response);
      notifySuccess("Password changed successfully");
      // redirectTo("/");
      redirectToSlugLoginCompany(authParams.slug, data.email);
    } catch (error) {
      console.log(error);
      ErrorHandler.showError(error, true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      redirectToLoginCompany();
    }

    console.log("token", token);
    const tokenDecoded = decrypt(token as string);
    console.log("tokenDecoded", tokenDecoded);
    console.log("tokenDecoded", tokenDecoded.userId);

    setAuthParams({
      token: tokenDecoded.token,
      userId: tokenDecoded.userId,
      slug: tokenDecoded.slug,
    });

    setValue("email", tokenDecoded.email);
    // if (token && dl_userid) {
    //   validateToken(token, dl_userid);
    // } else {
    //   redirectToLoginCompany();
    // }
  }, []);

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
                <InputHookForm name="email" required label="Email" />
              </Grid>

              <Grid item xs={12}>
                <InputHookForm name="fullname" required label="Full Name" />
              </Grid>

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
                  label="Confirm Password"
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

          <Box
            sx={{
              mt: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <span>
                Already have an account? Sign in here for the best experience.
              </span>
              <Link href="/auth/login_company/email_password" passHref>
                <Button variant="text">login</Button>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
