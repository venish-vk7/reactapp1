import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const page2Navigate = () => {
    navigate("/page2");
  };

  const page2Mfe = () => {
    navigate("/reactapp2");
  };

  return (
    <div className="App">
      <header className="App-header">Parent component 1</header>
      <button onClick={page2Navigate}>page2</button>
      &nbsp;<button onClick={page2Mfe}>reactapp2</button>
    </div>
  );
};

export default App;
