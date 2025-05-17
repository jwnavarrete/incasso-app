"use client";
import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface Action {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface ActionsListUIProps {
  buttonTitle?: string;
  buttonIcon?: React.ReactNode;
  actions: Action[];
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
  transformOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
}

// https://mui.com/material-ui/react-popover/

const ActionsListUI: React.FC<ActionsListUIProps> = ({
  buttonTitle,
  buttonIcon,
  actions,
  anchorOrigin = { vertical: "top", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "right" },
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={buttonIcon}
      >
        {buttonTitle}
      </Button>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
          >
            {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
            <ListItemText primary={action.title} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionsListUI;
