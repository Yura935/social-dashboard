import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { deleteAccount } from "../../store/socialSlice";
import { useAppDispatch } from "../../store/hooks";

type Props = {
    open: boolean;
    onClose: () => void;
    deleteConfirmId: string | null;
    onDeleted: () => void;
};

export default function DeleteConfirmationModal({ open, onClose, deleteConfirmId, onDeleted }: Props) {
    const dispatch = useAppDispatch();

    const handleConfirmDelete = () => {
        if (!deleteConfirmId) return;
        dispatch(deleteAccount(deleteConfirmId));
        onDeleted();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
            <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Are you sure you want to delete this account? This cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
