"use client";
import {
  getClientSessionByCode,
  setAuthSession,
} from "@/utils/session";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AuthCookieNames } from "@/common/enums/authCookieNames";
import { iTokens } from "@/common/types/auth/auth";
import useClientRouter from "@/hooks/useNavigations";
import { notifyError } from "@/utils/notifications";

const RedirectPage = () => {
  const { redirectTo, redirectToLoginCompany } = useClientRouter();

  useEffect(() => {
    const session = getClientSessionByCode(AuthCookieNames.AUTH_TOKEN);
    if (session) {
      try {
        const jsonParsed: iTokens = JSON.parse(session);
        setAuthSession(jsonParsed);
        redirectTo("/");
      } catch (error) {
        notifyError("Error parsing token");
      }
    } else {
      redirectToLoginCompany();
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Redirecting...
      </Typography>
    </Box>
  );
};

export default RedirectPage;
