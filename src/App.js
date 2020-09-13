import React from 'react';
import { Provider } from "react-redux";
import store from "./store/Store";
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Fallback from "./components/Fallback"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store} className="App">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="*" component={Fallback} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
