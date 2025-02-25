import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import TreeViewUI from "@/common/components/ui/TreeViewUI";
import { AppState } from "@/common/store/global.store";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import useFilteredMenuByRole from "@/common/hooks/useFilteredMenuByRole";

export default function MenuContent() {
  const user = useSelector((state: AppState) => state.user);

  const getItems =
    useCallback((): TreeViewBaseItem<ExtendedTreeItemProps>[] => {
      if (user?.role) {
        const filteredMenu = useFilteredMenuByRole(user?.role);
        return filteredMenu;
      }
      return [];
    }, [user?.role]); // Dependemos de user?.role

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <TreeViewUI items={getItems()} />
    </Stack>
  );
}
