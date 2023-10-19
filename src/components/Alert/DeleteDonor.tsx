import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useDeleteRequestMutation } from '../../api/apiHandler';
import { toast } from 'react-toastify';

function DeleteDonor({
  open,
  onClose,
  slug,
  id,
}: {
  open: boolean;
  onClose: (
    event: React.SyntheticEvent | MouseEvent,
    reason?: 'backdropClick' | 'escapeKeyDown'
  ) => void;
  slug: string;
  id: string;
}) {
  const [deleteDonor] = useDeleteRequestMutation();
  async function handleDelete(slug: string, id: string) {
    await deleteDonor(`${slug}/${id}`)
      .unwrap()
      .then(() => {
        toast.success('Sucessfully Deleted');
      })
      .catch((error) => {
        toast.error(`Failed to delete ${error} `);
      });
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Record</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onClose(new MouseEvent('click'), 'backdropClick');
            handleDelete(slug, id);
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDonor;
