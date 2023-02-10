import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends React.Component {
  state = {
    categoriesList: [],
    searchInput: '',
    productList: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    // console.log(categories);
    this.setState({
      categoriesList: categories,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    // value = target.type === 'checkbox' ? target.checked : value;
    this.setState({
      [name]: value,
    });
  };

  getCategoryAndQuery = async () => {
    const { searchInput } = this.state;
    const productsArray = await getProductsFromCategoryAndQuery(undefined, searchInput);
    // console.log(productsArray);
    this.setState({
      productList: productsArray.results,
    });
  };

  render() {
    const {
      categoriesList,
      searchInput,
      productList,
    } = this.state;
    // console.log(productList);
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
        <input
          value={ searchInput }
          type="text"
          onChange={ this.handleChange }
          name="searchInput"
          data-testid="query-input"
        />

        <button
          onClick={ this.getCategoryAndQuery }
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <div>
          {
            productList.length === 0 ? <p>Nenhum produto foi encontrado</p> : (
              productList.map((product) => (
                <div data-testid="product" key={ product.id }>
                  <p>{ product.title }</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ product.price }</p>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

export default ProductList;
