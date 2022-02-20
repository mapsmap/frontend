import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { setConstantValue } from 'typescript';
import React from 'react'

export default function ContentTitleForm() {
    const [value, setValue] = React.useState('Controlled')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
       <Box 
        component="form"
        sx={{'& .MuiTextField-root':{m:1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
        >
           <div>
               <TextField 
                id="Content Title"
                label="Title"
                variant = "outlined"
                defaultValue="Your Content"
                ></TextField>
           </div>
       </Box>
    );
}