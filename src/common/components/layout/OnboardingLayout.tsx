import React from "react";
import { Box } from "@mui/material";
import Image from 'next/image';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  backgroundImageUrl: string;
  leftWidthPercentage?: string;
  rightWidthPercentage?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  backgroundImageUrl,
  leftWidthPercentage = "60%",
  rightWidthPercentage = "40%",
}) => {
  return (
    <Box
      display="flex"
      height="100vh" // Ocupa toda la altura de la pantalla
      sx={{ overflow: "hidden" }} // Evita el desbordamiento
    >
      {/* Sección del formulario (izquierda) */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // maxHeight={600}
        width={leftWidthPercentage} // Ocupa el porcentaje especificado
        p={4} // Padding interno
      >
        {children}
      </Box>

      {/* Sección de la imagen (derecha) */}
      <Box
        width={rightWidthPercentage} // Ocupa el porcentaje especificado
        position="relative"
      >
        <Image
          src={backgroundImageUrl} // URL de la imagen
          layout="fill" // Ocupa todo el espacio del contenedor
        //   objectFit="cover" // La imagen ocupa todo el espacio y se recorta si es necesario
        //   objectPosition="center" // Centra la imagen
          alt="Background Image" // Texto alternativo
        />
      </Box>
    </Box>
  );
};

export default OnboardingLayout;
