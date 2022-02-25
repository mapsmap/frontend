import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import useStore from '../store';
import useStoreLocal from '../storeLocal';

export default function EditNodeDialog() {
    const nameField = useRef();

    const dialog = useStoreLocal(state => state.dialog);
    const closeDialog = useStoreLocal(state => state.closeDialog);
    const renameNode = useStore(state => state.renameNode);
    const trees = useStore(state => state.trees);

    const isOpen = () => {
        if (dialog && dialog.name === "editNode") {
            return true;
        }
        return false;
    }

    const getCurrentTitle = () => {
        if (!dialog || !dialog.args) {
            return "";
        }
        const treeId = dialog.args.treeId;
        const nodeId = dialog.args.id;

        const nodes = trees[treeId].nodes;
        const title = nodes.find(node => node.id === nodeId).title;

        return title;
    }

    const handleSave = () => {
        renameNode(dialog.args.treeId, dialog.args.id, nameField.current.value);
        closeDialog();
    }

    return (
        <Dialog open={isOpen()} onClose={closeDialog}>
            <DialogTitle sx={{ minWidth: "30vw" }}>Edit Node</DialogTitle>
            <DialogContent>
                <FormGroup sx={{ marginTop: "1rem" }}>
                    <TextField
                        autoFocus
                        inputRef={nameField}
                        defaultValue={getCurrentTitle()}
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}