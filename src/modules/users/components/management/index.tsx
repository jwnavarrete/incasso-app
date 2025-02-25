"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DynamicTabsUI from "@/common/components/ui/DynamicTabsUI";
import { Button, Typography } from "@mui/material";
import Search from "./Search";
import InviteButton from "./InviteButton";
import { Grid } from "@mui/system";
import CustomizedDataGridUI from "@/common/components/ui/CustomizedDataGridUI";
import { useUserContext } from "@/modules/users/context/userContext";
import { columns } from "./Columns";
import ModalInviteUsers from "./ModalInviteUsers";
import { TfiReload } from "react-icons/tfi";

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
  const { getAllUsers, users, loading, pagination } = useUserContext();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <Typography variant="h4">User Management</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 10 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Search />

            <Button
              variant="text"
              color="primary"
              disabled={loading}
              onClick={getAllUsers}
            >
              <TfiReload />
            </Button>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 6, lg: 2 }}
          sx={{ textAlign: "right", alignItems: "center" }}
        >
          <InviteButton />
        </Grid>

        {/* <Grid size={{ xs: 12, lg: 12 }}>
          {loading && <Typography>Loading...</Typography>}
        </Grid> */}

        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGridUI
            rows={users}
            columns={columns}
            pageSize={pagination.pageSize}
            rowHeight={70}
            onPageChange={(data) => {
              console.log(data);
            }}
          />
        </Grid>
      </Grid>

      <ModalInviteUsers />
    </>
  );
};

export default UsersComponent;
