import React from "react";
import { Typography } from "@mui/material";
import { TreeItem2Label } from "@mui/x-tree-view/TreeItem2";
import IconRender from "./IconRender";
import { useRouter } from "next/navigation";

export function CustomLabel({
  Icon,
  path,
  children,
  ...other
}: CustomLabelProps) {
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <TreeItem2Label
      {...other}
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={handleClick}
    >
      {Icon && <IconRender Icon={Icon} />}

      <Typography
        className="labelText"
        variant="body2"
        sx={{ color: "text.primary" }}
      >
        {children}
      </Typography>
    </TreeItem2Label>
  );
}
