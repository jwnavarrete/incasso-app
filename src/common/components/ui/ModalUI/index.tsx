import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalUIProps {
  isOpen: boolean;
  title: string;
  canClose: boolean;
  onClose: () => void;
  onOpen: () => void;
  content: ReactNode;
  actions: ReactNode;
}

const ModalUI: React.FC<ModalUIProps> = ({
  isOpen,
  title,
  canClose,
  onClose,
  onOpen,
  content,
  actions,
}) => {
  return (
    <Dialog open={isOpen} onClose={canClose ? onClose : undefined} maxWidth="md" fullWidth>
      <DialogTitle>
        {title}        
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default ModalUI;
