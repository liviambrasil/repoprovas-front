import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/home"
import NewTest from './pages/newTest';
import Professors from './pages/professors';
import Subjects from './pages/subjects';
import Tests from './pages/filterTests';
import GlobalStyle from './styles/GlobalStyles';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/tests" exact>
                <Tests />
              </Route>
              <Route path="/tests/subjects">
                <Subjects />
              </Route>
              <Route path="/tests/professors">
                <Professors />
              </Route>
              <Route path="/new-test">
                <NewTest />
              </Route>
            </Switch>
      </BrowserRouter>
    </ThemeProvider>
)}

export default App;