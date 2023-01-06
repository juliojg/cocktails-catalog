import React from "react";
import "./App.css";
import "./styles/colors.css";
import { CatalogRouter } from "router/Router";
import { setupStore } from './store/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={setupStore()}>
      <CatalogRouter />
    </Provider>
  );
}

export default App;
