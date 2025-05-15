import React from 'react';
import Box from '@mui/material/Box';


function IconRender({ Icon }: IconRenderProps) {
    return (
        <Box sx={{ marginRight: 1, display: "flex"}}>
            <Icon />
        </Box>
    );
}

export default IconRender;
