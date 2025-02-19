"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import DynamicTabsUI from "@/common/components/ui/DynamicTabsUI";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { TfiFilter } from "react-icons/tfi";
import { FaUserPlus } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Search from "@/common/components/layout/Search";
import FilterButton from "./Filter";
import InviteButton from "./InviteButton";

const UsersComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Users", value: "users", content: <UserManagementComponent /> },
  ];

  return (
    <Box width="100%" textAlign="left">
      <DynamicTabsUI
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </Box>
  );
};

const UserManagementComponent: React.FC = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="h4">User Management</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Search />

            <FilterButton />
          </Box>

          <InviteButton />
        </Box>
      </Box>
    </>
  );
};

export default UsersComponent;
