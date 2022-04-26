import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import GameProvider from "./context/GameContext";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        black: "#474747",
        primaryColor: "orange",
      }}
    >
      <TypographyStylesProvider
        style={{
          width: "100%",
          // height: "100%"
        }}
      >
        <GameProvider>
          <App />
        </GameProvider>
      </TypographyStylesProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
