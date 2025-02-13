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
import { notifyWarning } from "@/common/lib/notifications";

const AccountUrl: React.FC = () => {
  const { validateSlug, loading } = useAuthContext();

  const { redirectToLoginCompany, redirectToSlug } = useClientRouter();

  const methods = useForm({
    resolver: yupResolver(emailSchema),
  });

  const { handleSubmit } = methods;

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
      console.log(error);
      ErrorHandler.showError("Invalid slug", true);
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
            Get
          </Typography>
          <Typography component="h3" variant="h3">
            My Account URL
          </Typography>
        </Box>

        <Typography component="h5" variant="body2" mt={2}>
          Enter your email and we'll send you your account URL.
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
                  endIcon={<StartIcon />}
                  fullWidth
                >
                  Send
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

export default AccountUrl;
