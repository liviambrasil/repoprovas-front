import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/home"
import NewTest from './pages/newTest';
import Tests from './pages/tests';
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
              <Route path="/tests">
                <Tests />
              </Route>
              <Route path="/new-test">
                <NewTest />
              </Route>
            </Switch>
      </BrowserRouter>
    </ThemeProvider>
)}

export default App;
