import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Menu from './components/menu/Menu';
import Main from './components/Main';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/'>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
