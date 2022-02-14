import * as React from "react";
import ReactDOM from "react-dom";

// Material-UI
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// custom css
import "./assets/css/index.css";
import theme from "./assets/js/theme";

// UI Router
import UIRouter from "./routes/UIRouter";

// Context Provider
import AuthProvider from "./context/auth/AuthProvider";
import LoaderProvider from "./context/loader/LoaderProvider";

const app = (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <LoaderProvider>
        <AuthProvider>
          <UIRouter />
        </AuthProvider>
      </LoaderProvider>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));
