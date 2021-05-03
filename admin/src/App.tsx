import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/products" component={ProductPage} exact />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
