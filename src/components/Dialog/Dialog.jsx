import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({
  open,
  handleClose,
  dialogTitle,
  description,
  children,
  background,
  colorCode,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: background ? colorCode : "",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className={`${background ? "text-white" : ""}`}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={`${background ? "text-white" : ""}`}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>{children}</DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
