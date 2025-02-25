import React from "react";
import Button from "@mui/material/Button";
import { FaUserPlus } from "react-icons/fa";
import { useUserContext } from "@/modules/users/context/userContext";

const InviteButton: React.FC = () => {
  const { setOpenModalInvite } = useUserContext();

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      startIcon={<FaUserPlus />}
      onClick={() => setOpenModalInvite(true)}
      sx={{ textTransform: "none" }}
    >
      Invite
    </Button>
  );
};

export default InviteButton;
