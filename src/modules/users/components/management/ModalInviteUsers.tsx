import React, { useState } from "react";
import ModalUI from "@/common/components/ui/ModalUI";
import EmailTagsInput from "@/common/components/ui/EmailTagsInputUI";
import { useUserContext } from "@/modules/users/context/userContext";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { roles } from "../roles";
import { notifyInfo, notifyWarning } from "@/common/lib/notifications";
import { ErrorHandler } from "@/common/lib/errors";

const ModalInviteUsers: React.FC = () => {
  const { openModalInvite, setOpenModalInvite, inviteUsers } = useUserContext();

  const [emails, setEmails] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleCloseModal = () => {
    setEmails([]);
    setSelectedRole("");
    setOpenModalInvite(false);
  };

  const handleClickInvite = async () => {
    if (emails.length === 0) {
      notifyWarning("Please enter at least one email.");
      return;
    }

    if (!selectedRole) {
      notifyWarning("Please select a role.");
      return;
    }

    try {
      await inviteUsers(selectedRole, emails);
      notifyInfo("Invitation resent successfully");
      handleCloseModal();
    } catch (error) {
      ErrorHandler.showError(error, true);
    }

    console.log("Emails:", emails);
    console.log("Selected Role:", selectedRole);
  };

  return (
    <>
      <ModalUI
        isOpen={openModalInvite}
        title="Invite to work management"
        canClose={true}
        onClose={() => {
          handleCloseModal();
        }}
        onOpen={() => {}}
        content={
          <>
            <EmailTagsInput
              emails={emails}
              setEmails={setEmails}
              color="primary"
            />

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="role"
                name="role"
                row
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <FormControlLabel
                    key={role.value}
                    value={role.value}
                    control={<Radio />}
                    label={role.description}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        }
        actions={
          <>
            <Button
              variant="text"
              size="small"
              onClick={() => setOpenModalInvite(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickInvite}
              color="primary"
            >
              Invite
            </Button>
          </>
        }
      />
    </>
  );
};

export default ModalInviteUsers;
