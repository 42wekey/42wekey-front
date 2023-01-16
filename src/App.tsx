import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Main from "./components/Main";

const App = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <BrowserRouter>
      <Switch>
        {isLogin ? (
          <>
            <Route path="/">
              <Main />
            </Route>
          </>
        ) : (
          <Route path="/">
            <Login />
          </Route>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
