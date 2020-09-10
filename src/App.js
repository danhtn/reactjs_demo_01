import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Fallback from "./components/Fallback"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
        <Box my={4}>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="*" component={Fallback} />
          </Switch>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
