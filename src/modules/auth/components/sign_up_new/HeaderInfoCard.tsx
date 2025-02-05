import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface HeaderInfoCardProps {
  title: string;
  subtitle: string;
  logoSrc: string;
}

const HeaderInfoCard: React.FC<HeaderInfoCardProps> = ({
  title,
  subtitle,
  logoSrc,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          color="primary"
          sx={{
            textAlign: "left",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{
            textAlign: "left",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      <Image src={logoSrc} alt={"Logo"} width={120} height={57} />
    </Box>
  );
};

export default HeaderInfoCard;
