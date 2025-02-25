"use client";
import React, { useEffect } from "react";
import {
  Container,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { getClientSessionByCode } from "@/common/lib/session";
import useTranslation from "@/common/hooks/useTranslation";
import LoadingUI from "@/common/components/ui/LoadingUI";

const CurrentAccount: React.FC = () => {
  const router = useRouter();
  const [accounts, setAccounts] = React.useState<string[]>([]);
  const { t } = useTranslation();
  const [client, setClient] = React.useState(false);

  useEffect(() => {
    const dapulseAccountSlugs = getClientSessionByCode("dapulseAccountSlugs");
    const sessionAccounts = JSON.parse(dapulseAccountSlugs || "[]");
    setAccounts(sessionAccounts);
    setClient(true);
  }, []);

  const handleAccountClick = (account: string) => {
    router.push(`https://${account}.${process.env.NEXT_PUBLIC_DOMAIN_NAME}`);
  };

  if (accounts.length === 0) {
    return null;
  }

  if (!client) {
    return <LoadingUI />;
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />

      <Box
        sx={{
          border: "1px solid",
          borderColor: "grey.100",
          borderRadius: 1,
          padding: 2,
          marginTop: 4,
          maxWidth: 700,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography variant="body1">
          <span> {t("auth.already_signed_in")}</span>
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {accounts.map((account, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => handleAccountClick(account)}
                startIcon={<HomeIcon />}
              >
                {account}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CurrentAccount;
