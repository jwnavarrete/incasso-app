import * as React from "react";
import { Box, Skeleton } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
    >
      <Box width="100%" display="flex">
        <Skeleton variant="text" width={200} height={40} />
      </Box>
      <Box width="100%" display="flex">
        <Skeleton variant="rectangular" width="100%" height={'70vh'} />
      </Box>      
    </Box>
  );
}
