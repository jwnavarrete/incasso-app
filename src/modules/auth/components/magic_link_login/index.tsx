"use client";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useClientRouter from "@/common/hooks/useNavigations";
import axios from "axios";
import { ErrorHandler } from "@/common/lib/errors";
import store, { setUser } from "@/common/store/global.store";
import { getUserInfo, setUserInfo } from "@/common/lib/userInfo";

const MagicLinkLogin = () => {
  const { redirectToLoginCompany, redirectTo } = useClientRouter();

  useEffect(() => {
    handleMagicLinkLogin();
  }, []);

  const handleMagicLinkLogin = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const path = urlParams.get("path");
      const token = urlParams.get("token");
      const dl_userid = urlParams.get("dl_userid");
      const dl_slug = urlParams.get("dl_slug");

      if (token && dl_userid && dl_slug && path === "email_confirmed") {
        await axios.post("/api/proxy/auth/verify-email/", {
          token,
        });

        const userInfo = getUserInfo();
        if (userInfo) {
          setUserInfo({ ...userInfo, emailVerified: true });
          store.dispatch(setUser({ ...userInfo, emailVerified: true }));

          redirectTo("/");
        }
      } else {
        throw new Error("Invalid parameters");
      }
    } catch (error) {
      ErrorHandler.showErrorWithCallback(error, () => {
        redirectToLoginCompany();
      });
    }
  };

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
        Verifying email...
      </Typography>
    </Box>
  );
};

export default MagicLinkLogin;
