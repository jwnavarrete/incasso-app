import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useUserContext } from "@/modules/users/context/userContext";
import { notifyInfo } from "@/common/lib/notifications";
import { ErrorHandler } from "@/common/lib/errors";

interface ModalEditEmailProps {
  open: boolean;
  handleClose: () => void;
  userId: string;
  currentEmail: string;
}

const ModalEditEmail: React.FC<ModalEditEmailProps> = ({
  open,
  handleClose,
  userId,
  currentEmail,
}) => {
  const { updateUser } = useUserContext();
  const [newEmail, setNewEmail] = useState(currentEmail);

  const handleEmailChange = async () => {
    try {
      const userResponse = await updateUser(userId, { email: newEmail });
      handleClose();
      console.log(userResponse);
      if (userResponse) {
        notifyInfo("Email updated successfully");
      }
    } catch (error) {
      ErrorHandler.showError(error, true);
    }
  };

  const handleClickClose = () => {
    setNewEmail(currentEmail);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Email</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel</Button>
        <Button onClick={handleEmailChange} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditEmail;
