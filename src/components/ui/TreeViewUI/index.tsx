"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import CustomTreeItem from "./CustomTreeItem";

export default function TreeViewUI({
  items,
}: {
  items: TreeViewBaseItem<ExtendedTreeItemProps>[];
}) {
  return (
    <Box
      sx={{
        gap: "4px",
        margin: 2,
      }}
    >
      <RichTreeView
        items={items}
        aria-label="pages"
        multiSelect
        defaultExpandedItems={["2"]}
        defaultSelectedItems={["1", "1"]}
        sx={{
          m: "0 -8px",
          pb: "8px",
          height: "fit-content",
          flexGrow: 1,
          overflowY: "auto",
        }}
        slots={{ item: CustomTreeItem }}
      />
    </Box>
  );
}
