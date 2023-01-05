import React from "react";
import "./App.css";
import "./styles/colors.css";
import { CatalogRouter } from "router/Router";
import { store } from './store/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <CatalogRouter />
    </Provider>
  );
}

export default App;
