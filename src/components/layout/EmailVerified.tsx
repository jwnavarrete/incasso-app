import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { AppState } from "@/store/global.store"; // Adjust the import path as necessary
import { notifyInfo, notifyError } from "@/utils/notifications";

import api from "@/lib/axiosInstance";

const EmailVerified: React.FC = () => {
  const user = useSelector((state: AppState) => state.user);

  if (!user) return null;

  if (user.emailVerified) return null;

  const handleResendEmail = () => {
    const userId = user.sub;
    api
      .post("auth/resend-verification-email", { userId })
      .then(() => {
        notifyInfo("Email sent successfully");
      })
      .catch(() => {
        notifyError("Error sending email");
        // console.error("Error sending email:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: { xs: "fixed", md: "relative" },
        bottom: { xs: 0, md: "auto" },
        top: { xs: "auto", md: 0 },
        left: 0,
        width: "100%",
        zIndex: { xs: 100, md: 1300 },
        backgroundColor: "primary.main",
        color: "white",
        p: 2,
        textAlign: "center",
      }}
    >
      Please confirm your email address: {user?.email}
      <a
        onClick={handleResendEmail}
        style={{
          color: "white",
          textDecoration: "underline",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Resend Email
      </a>
    </Box>
  );
};

export default EmailVerified;
