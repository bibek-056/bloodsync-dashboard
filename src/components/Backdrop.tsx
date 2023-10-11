import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div>Are you sure you want to delete this donor?</div>
      </Backdrop>
    </div>
  );
}
