"use client";
import {
  getClientSessionByCode,
  setAuthSession,
} from "@/common/lib/session";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AUTH_TOKEN } from "@/common/lib/constant";
import { iTokens } from "@/modules/auth/interfaces/auth.interface";
import useClientRouter from "@/common/hooks/useNavigations";
import { notifyError } from "@/common/lib/notifications";

const RedirectPage = () => {
  const { redirectTo, redirectToLoginCompany } = useClientRouter();

  useEffect(() => {
    const session = getClientSessionByCode(AUTH_TOKEN);
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
