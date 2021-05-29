import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Lobby from './Lobby';
import Menu from './Menu';

ReactDOM.render(
  <Router>  
    <Switch>
      <Route exact path="/">
        <Menu/>
      </Route>
      <Route exact path="/lobby/:id">
        <Lobby/>
      </Route>
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);