import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import "./styles/style.css";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default App;
