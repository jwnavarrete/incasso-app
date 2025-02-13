import React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { AppState } from "@/common/store/global.store"; // Adjust the import path as necessary
import { notifyInfo, notifyError } from "@/common/lib/notifications";

import api from "@/common/lib/axiosInstance";

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
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1300, // Ensure it's above other elements
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
