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
import Image from "next/image";
import useClientRouter from "@/common/hooks/useNavigations";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "@/modules/auth/validations/auth.schema";
import InputHookForm from "@/common/components/ui/InputHookForm";
import { useAuthContext } from "@/modules/auth/context/authContext";
import { ErrorHandler } from "@/common/lib/errors";
import { notifyInfo, notifyWarning } from "@/common/lib/notifications";
import useTranslation from "@/common/hooks/useTranslation";
import LoadingUI from "@/common/components/ui/LoadingUI";

const AccountUrl: React.FC = () => {
  const { sendRecoveryUrl, loading } = useAuthContext();
  const [client, setClient] = React.useState(false);
  const { t } = useTranslation("auth");

  const { redirectToLoginCompany } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    setClient(true);
  }, []);

  const handleAuth = async (data: any) => {
    try {
      const message = await sendRecoveryUrl(data.email);

      if (message) {
        notifyInfo(message);
      } else {
        notifyWarning("Account does not exist");
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
            {t("get_account_url.title.part1")}
          </Typography>
          <Typography component="h3" variant="h3">
            {t("get_account_url.title.part2")}
          </Typography>
        </Box>

        <Typography component="h5" variant="body2" mt={2}>
          {t("get_account_url.subtitle")}
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
                  placeholder={t("get_account_url.email_placeholder")}
                  label={t("get_account_url.email")}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  loading={loading}
                  variant="contained"
                  loadingPosition="start"
                  endIcon={<StartIcon />}
                  fullWidth
                >
                  {t("send_button")}
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
          {t("get_account_url.back_to_login")}
        </Button>
      </Grid>
    </Container>
  );
};

export default AccountUrl;
