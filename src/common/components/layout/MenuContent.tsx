"use client";
import * as React from "react";
import Stack from "@mui/material/Stack";
import TreeViewUI from "@/common/components/ui/TreeViewUI";
import { TenantAdminItems } from "@/common/components/ui/TreeViewUI/data";

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <TreeViewUI items={TenantAdminItems} />
    </Stack>
  );
}
