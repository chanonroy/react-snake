import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

var Router = BrowserRouter;

import { Game } from './game';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Game} />
            <Route render={function() {
              return <p> 404 - Not Found </p>
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
