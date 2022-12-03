import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";


function App() {

  // const ornginalState = store.getState()

  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
