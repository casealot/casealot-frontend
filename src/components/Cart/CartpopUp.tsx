import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface RemoveConfirmationDialogProps {
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

const RemoveConfirmationDialog: React.FC<RemoveConfirmationDialogProps> = ({
  open,
  onClose,
}) => {
  const handleConfirmRemove = (confirmed: boolean) => {
    onClose(confirmed);
  };

  return (
    <Dialog open={open} onClose={() => handleConfirmRemove(false)}>
      <DialogTitle>아이템 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this item from the cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirmRemove(true)}>삭제</Button>
        <Button onClick={() => handleConfirmRemove(false)}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveConfirmationDialog;
