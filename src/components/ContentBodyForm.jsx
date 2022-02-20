import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { setConstantValue } from 'typescript';
import React from 'react'

export default function ContentBodyForm() {
    const [value, setValue] = React.useState('Controlled')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
       <Box 
        component="form"
        sx={{'& .MuiTextField-root':{m:1, width: 'flex'},
        }}
        noValidate
        autoComplete="off"
        >
           <div>
               <TextField 
                id="content input"
                label="Content"
                multiline
                value = {value}
                onChange={handleChange}
                rows = {20}
                fullWidth
                ></TextField>
           </div>
       </Box>
    );
}