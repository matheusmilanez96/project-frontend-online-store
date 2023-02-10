import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

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
          <Route
            exact
            path="/productDetail:id"
            component={ ProductDetail }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
