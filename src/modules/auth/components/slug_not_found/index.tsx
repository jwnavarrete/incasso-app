"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

const PageNotFound = () => {
  const router = useRouter();

  const redirectToHome = () => {
    router.push("/auth/login_company");
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h1" gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have somehow got to a non-existing page. Go to our Home Page in order
        to find what you are looking for :)
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={redirectToHome}
        style={{ marginTop: "20px" }}
      >
        Go to Home Page
      </Button>
    </Container>
  );
};

export default PageNotFound;
