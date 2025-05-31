"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
  Button,
  Link,
  Box,
} from "@mui/material";
import { useAuthContext } from "@/context";
import DescriptionIcon from "@mui/icons-material/Description";
import { useRouter } from "next/navigation";
import { decodeToken, setProxiAuthSession } from "@/utils/session";
import { notifyError } from "@/utils/notifications";

const TermsAndConditionsCard = () => {
  const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  const [showMore, setShowMore] = useState(false);
  const { signUpData, updateCompanySignUpData, handleBack, signUp } =
    useAuthContext();
  const router = useRouter();

  const handleCheck = () => {
    updateCompanySignUpData({
      ...signUpData,
      termsAccepted: !signUpData.company.termsAccepted,
    });
  };

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleCreateAccount = async () => {
    try {
      // const urlParams = new URLSearchParams(window.location.search);
      // const token = urlParams.get("token") || null;
      const response = await signUp();
      // const response = await signUp(token);

      setProxiAuthSession(response);

      // REDIRECT TO SUBDOMAIN/REDIRECT
      if (response) {
        const token = decodeToken(response.accessToken);
        router.push(`https://${token?.subdomain}.${DOMAIN_NAME}/auth/redirect`);
      }
    } catch (error) {
      console.log(error);
      notifyError("Error creating account, try again later");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: "70%", width: "100%" }}>
        <CardContent>
          {/* Icono y Título */}
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <IconButton sx={{ fontSize: 40 }}>
              <DescriptionIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 1 }}>
              Terms and Conditions of Use
            </Typography>
          </Box>

          {/* Texto de los términos */}
          <Box sx={{ maxHeight: "50vh", overflowY: "auto", marginTop: 2 }}>
            <Typography variant="body1">
              <span>
                Welcome to [Dazzsoft] (hereinafter referred to as "the
                Platform"). By accessing or using our Platform, you agree to
                comply with these Terms and Conditions. If you do not agree with
                any part of these terms, please refrain from using the Platform.
                1. Acceptance of Terms By using the Platform, you confirm that
                you are at least 18 years old or meet the legal age required in
                your country to access these services. 2. Use of the Platforq
                You agree to use the Platform responsibly and only for lawful
                purposes^ Any attempt to disrupt the Platform’s functionality or
                engage in fraudulent activity is strictly prohibited. 3. Account
                Creatiop Certain features may require you to create an account.
                You are responsible for the confidentiality of your login
                information^ All information provided during registration must
                be accurate, complete, and up-to-date. 4. Intellectual PropertO
                All content on the Platform, including but not limited to text,
                images, logos, and design, is the property of [Your Company
                Name]^ Unauthorized use, reproduction, or distribution of our
                content is strictly prohibited.
              </span>
              {showMore && (
                <span>
                  require you to create an account. You are responsible for the
                  confidentiality of your login information^ All information
                  provided during registration must be accurate, complete, and
                  up-to-date. 4. Intellectual PropertO All content on the
                  Platform, including but not limited to text, images, logos,
                  and design, is the property of [Your Company Name]^
                  Unauthorized use, reproduction, or distribution of our content
                  is strictly prohibited. 5. Limitation of LiabilitO [Your
                  Company Name] is not responsible for any damages, losses, or
                  disruptions caused by the use of the Platform^ Use of the
                  Platform is at your own risk. 6. Changes to Termj We may
                  update these Terms and Conditions at any time. Any changes
                  will be posted on this page, and your continued use of the
                  Platform constitutes acceptance of the updated terms. 7.
                  Privacy Policy Your use of the Platform is also governed by
                  our Privacy Policy, which explains how we collect, use, and
                  protect your personal data. require you to create an account.
                  You are responsible for the confidentiality of your login
                  information^ All information provided during registration must
                  be accurate, complete, and up-to-date. 4. Intellectual
                  PropertO All content on the Platform, including but not
                  limited to text, images, logos, and design, is the property of
                  [Your Company Name]^ Unauthorized use, reproduction, or
                  distribution of our content is strictly prohibited. 5.
                  Limitation of LiabilitO [Your Company Name] is not responsible
                  for any damages, losses, or disruptions caused by the use of
                  the Platform^ Use of the Platform is at your own risk. 6.
                  Changes to Termj We may update these Terms and Conditions at
                  any time. Any changes will be posted on this page, and your
                  continued use of the Platform constitutes acceptance of the
                  updated terms. 7. Privacy Policy Your use of the Platform is
                  also governed by our Privacy Policy, which explains how we
                  collect, use, and protect your personal data
                </span>
              )}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Link
              component="button"
              variant="body2"
              sx={{ display: "block", marginTop: 1 }}
              onClick={handleReadMore}
            >
              {showMore ? "Leer menos" : "Leer más"}
            </Link>
          </Box>

          {/* Check para aceptar los términos */}
          <Box display="flex" alignItems="center" marginTop={2}>
            <Checkbox
              checked={signUpData.company.termsAccepted}
              onChange={handleCheck}
            />
            <Typography variant="body2">
              Acepto los términos y condiciones
            </Typography>
          </Box>

          {/* Botón Crear cuenta */}
          <Box
            display="flex"
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            marginTop={3}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              sx={{ width: { xs: "100%", md: "auto" }, mb: { xs: 1, md: 0 } }}
            >
              Regresar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAccount}
              disabled={!signUpData.company.termsAccepted}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              Crear cuenta
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TermsAndConditionsCard;
