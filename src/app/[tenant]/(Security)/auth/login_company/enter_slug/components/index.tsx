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
import useClientRouter from "@/hooks/useNavigations";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { slugCompanySchema } from "@/common/validators/auth/auth.schema";
import InputHookForm from "@/components/ui/InputHookForm";
import CurrentAccount from "@/components/ui/CurrentAccount";
import { useAuthContext } from "@/context";
import { ErrorHandler } from "@/lib/errors";
import { notifyWarning } from "@/utils/notifications";
import LogoComponent from "@/components/ui/LogoComponent";
import useTranslation from "@/hooks/useTranslation";
import LoadingUI from "@/components/ui/LoadingUI";

const EnterSlug: React.FC = () => {
  const { validateSlug, loading } = useAuthContext();
  const { t } = useTranslation("auth");
  const [client, setClient] = React.useState(false);
  const { redirectToSignUp, redirectToSlug, redirectTo } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(slugCompanySchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return <LoadingUI />;
  }

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
              {t("login_company.enter_slug.title.part1")}
            </Typography>
            <Typography component="h3" variant="h3">
              {t("login_company.enter_slug.title.part2")}
            </Typography>
          </Box>

          <Typography component="h5" variant="body2" mt={2}>
            {t("login_company.enter_slug.subtitle")}
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
                    label={t("login_company.enter_slug.slug_input")}
                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <Button
                    onClick={() => redirectTo("get_account_url")}
                    variant="text"
                    sx={{ textTransform: "none" }}
                  >
                    {t("login_company.enter_slug.forgot_slug")}
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
          {t("login_company.enter_slug.no_account")}
          <Button variant="text" onClick={redirectToSignUp}>
            {t("register")}
          </Button>
        </Typography>
      </Container>
      <CurrentAccount />
    </>
  );
};

export default EnterSlug;
