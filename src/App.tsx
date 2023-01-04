import React from "react";
import "./App.css";
import "./styles/colors.css";
import { CatalogRouter } from "router/Router";
import { CatalogContextProvider } from "context/CatalogContext";

function App() {
  return (
    <CatalogContextProvider>
      <CatalogRouter />
    </CatalogContextProvider>
  );
}

export default App;
