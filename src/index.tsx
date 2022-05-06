import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MantineProvider, TypographyStylesProvider } from "@mantine/core";
import GameProvider from "./context/GameContext";
import PeerProvider from "./context/PeerContext";

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
        }}
      >
        <GameProvider>
          <PeerProvider>
            <App />
          </PeerProvider>
        </GameProvider>
      </TypographyStylesProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
