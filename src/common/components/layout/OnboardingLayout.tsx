import React from 'react';
import { Box } from '@mui/material';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    backgroundImageUrl: string;
    leftWidthPercentage?: string;
    rightWidthPercentage?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    backgroundImageUrl,
    leftWidthPercentage = '60%',
    rightWidthPercentage = '40%',
}) => {
    return (
        <Box
            display="flex"
            height="100vh" // Ocupa toda la altura de la pantalla
            sx={{ overflow: 'hidden' }} // Evita el desbordamiento
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
                sx={{
                    backgroundImage: `url(${backgroundImageUrl})`, // URL de la imagen
                    backgroundSize: 'cover', // Cubre todo el espacio
                    backgroundPosition: 'center', // Centra la imagen
                    backgroundRepeat: 'no-repeat', // Evita la repetición
                }}
            />
        </Box>
    );
};

export default OnboardingLayout;
