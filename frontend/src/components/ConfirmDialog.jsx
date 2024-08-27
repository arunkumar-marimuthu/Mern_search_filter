import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';



const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  const handleClose = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      confirmDialog.onConfirm();
    }
  };

  return (
    <Dialog open={confirmDialog.isOpen} onKeyPress={handleKeypress} >
      <Typography
        variant="subtitle1"
        sx={{ alignItems: 'center', marginTop: '10px', marginLeft: '10px', fontSize: '18px',fontWeight:900 }}
      >
       Alert !
        <IconButton sx={{ float: "right" }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Typography>

      <DialogTitle sx={{ alignItems: 'left', pl: '10px', fontSize: '14px', minWidth: '400px',fontWeight:"500",color:"red" }}>{confirmDialog.title}</DialogTitle>
      <DialogContent sx={{ alignItems: 'left', textAlign: 'left', pl: '10px',  }}>
        <Typography variant="subtitle1" sx={{ pt: '20px', fontSize: '14px',fontWeight:"500",color:"blue"  }}>
          {confirmDialog.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions>
       
        <Button variant="contained" sx={{ alignItems: 'right' }} onClick={handleClose}>
         close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
