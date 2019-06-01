import React, { Component } from 'react';
import Login from './components/Login';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Error from './components/Error';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
