import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";
import { CryptoProvider } from "./context/CryptoContext";


function App() {

  return (
    <Provider store={store}>
      <CryptoProvider>
      <div className="scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-slate-700">
        <Dashboard />
      </div>
      </CryptoProvider>
    </Provider>
  );
}

export default App;
