import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import useStore from '../store';
import useStoreLocal from '../storeLocal';

export default function CreateNodeDialog() {
    const [type, setType] = useState("text");
    const nameField = useRef();

    const dialog = useStoreLocal(state => state.dialog);
    const closeDialog = useStoreLocal(state => state.closeDialog);
    const addChildNode = useStore(state => state.addChildNode);

    const isOpen = () => {
        if (dialog && dialog.name === "createNode") {
            return true;
        }
        return false;
    }

    const handleCreate = () => {
        addChildNode(dialog.args.treeId, dialog.args.id, nameField.current.value, type);
        closeDialog();
    }

    return (
        <Dialog open={isOpen()} onClose={closeDialog}>
            <DialogTitle sx={{ minWidth: "30vw" }}>Create Node</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Configure the new node
                </DialogContentText>
                <FormGroup sx={{ marginTop: "1rem" }}>
                    <TextField
                        autoFocus
                        inputRef={nameField}
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth sx={{ marginTop: "1rem" }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Age"
                            onChange={e => setType(e.target.value)}
                        >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="video">Video</MenuItem>
                        </Select>
                    </FormControl>
                </FormGroup>

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}