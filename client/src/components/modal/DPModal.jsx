/* eslint-disable react/prop-types */
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";

const DPModal = ({ open = false, setOpen, title = "", sx, children }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          ...sx,
        }}
      >
        <Box
          sx={{
            p: 2,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <DialogTitle
              sx={{ m: 0, p: 2, fontWeight: "600", fontSize: "25px" }}
              id="customized-dialog-title"
            >
              {title}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <DialogContent>{children}</DialogContent>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default DPModal;
