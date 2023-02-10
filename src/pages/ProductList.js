import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class ProductList extends React.Component {
  state = {
    categoriesList: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    console.log(categories);
    this.setState({
      categoriesList: categories,
    });
  }

  render() {
    const {
      categoriesList,
    } = this.state;
    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart" />
        <ul>
          { categoriesList.map((cat) => (
            <button data-testid="category" key={ cat.id }>{ cat.name }</button>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
