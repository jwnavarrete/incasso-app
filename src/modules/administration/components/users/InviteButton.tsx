import React from 'react';
import Button from '@mui/material/Button';
import { FaUserPlus } from 'react-icons/fa';

const InviteButton: React.FC = () => {
    return (
        <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<FaUserPlus />}
            sx={{ textTransform: "none" }}
        >
            Invite
        </Button>
    );
};

export default InviteButton;