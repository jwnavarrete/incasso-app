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
  InputAdornment,
} from "@mui/material";
import { GrLinkNext } from "react-icons/gr";
import useClientRouter from "@/common/hooks/useNavigations";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { slugCompanySchema } from "@/modules/auth/validations/auth.schema";
import InputHookForm from "@/common/components/ui/InputHookForm";
import CurrentAccount from "../current_account";
import { useAuthContext } from "@/modules/auth/context/authContext";
import { ErrorHandler } from "@/common/lib/errors";
import { notifyWarning } from "@/common/lib/notifications";
import LogoComponent from "@/common/components/ui/LogoComponent";

const EnterSlug: React.FC = () => {
  const { validateSlug, loading } = useAuthContext();

  const { redirectToSignUp, redirectToSlug, redirectTo } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(slugCompanySchema),
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {}, []);

  const handleAuth = async (data: any) => {
    try {
      const response = await validateSlug(data.slug);

      if (response.isValid) {
        redirectToSlug(data.slug);
      } else {
        notifyWarning("Account does not exist");
      }
    } catch (error) {
      ErrorHandler.showError("Invalid slug", true);
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

          <Box display="flex" alignItems="center">
            <Typography component="h3" variant="h3" fontWeight="bold" mr={1}>
              Log
            </Typography>
            <Typography component="h3" variant="h3">
              in
            </Typography>
          </Box>

          <Typography component="h5" variant="body2" mt={2}>
            Enter your account's web address:
          </Typography>

          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(handleAuth)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container mt={2}>
                <Grid item xs={12}>
                  <InputHookForm
                    name="slug"
                    required
                    placeholder="e.g. my-company"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          .{process.env.NEXT_PUBLIC_DOMAIN_NAME}
                        </InputAdornment>
                      ),
                    }}
                    label="Enter your slug"
                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <Button
                    onClick={() => redirectTo("get_account_url")}
                    variant="text"
                    sx={{ textTransform: "none" }}
                  >
                    Forgot your account's web address?
                  </Button>
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

export default EnterSlug;
