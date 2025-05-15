import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import useTranslation from "@/hooks/useTranslation";

const HomeComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // const currentLanguage = i18n.language;

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {t("home.title")}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {t("home.subtitle")}
        </Typography>
      </Box>
    </Container>
  );
};

export default HomeComponent;
