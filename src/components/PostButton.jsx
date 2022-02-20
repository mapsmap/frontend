import Button from "@mui/material/Button"
import React from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Switch, 
    Route,
    useParams
} from "react-router-dom"


export default function PostButton(){ 

    return(
    <Button variant = "contained" type = "submit">Upload</Button>
    )
}