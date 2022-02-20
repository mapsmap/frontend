import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Items from "./routes/items";
import TextContentPage from "./routes/textContentPage";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./routes/homePage";
import TopicPage from "./routes/topicPage"
import VideoContentPage from "./routes/videoContentPage"
import UploadPage from "./routes/uploadPage"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="trees" element={<App />} />
        <Route path="items" element={<Items />} />
        <Route path="text-content" element={<TextContentPage />} />
        <Route path="topics" element={<TopicPage />}>
          <Route path=":topicName" element={<TopicPage />} />
        </Route>
        <Route path="video-content" element={<VideoContentPage/>}>
          <Route path=":videoId" element={<VideoContentPage/>}/>
        </Route>
        <Route path = "upload" element ={<UploadPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
