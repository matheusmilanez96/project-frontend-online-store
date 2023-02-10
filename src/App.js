import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/cart"
            component={ Cart }
          />
          <Route
            exact
            path="/"
            component={ ProductList }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
