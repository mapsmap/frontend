import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import TreePage from "./routes/treePage";
import TreeOverviewPage from "./routes/treeOverviewPage";
import ContentPage from "./routes/contentPage";
import ContentOverviewPage from "./routes/contentOverviewPage";
import HomePage from "./routes/homePage";
import TopicPage from "./routes/topicPage"

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tree" element={<TreeOverviewPage />} />
        <Route path="/tree/:treeId" element={<TreePage />} />
        <Route path="/content" element={<ContentOverviewPage />} />
        <Route path="/content/:contentId" element={<ContentPage />} />
        <Route path="/topic" element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
