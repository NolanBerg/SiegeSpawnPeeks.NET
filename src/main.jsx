import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import { Analytics } from "@vercel/analytics/react"; // Analytics
import { SpeedInsights } from "@vercel/speed-insights/react"; // Speed Insights
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap all components in fragment */}
      <>
        <App />
        <Analytics />
        <SpeedInsights />
      </>
    </BrowserRouter>
  </StrictMode>
);