import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class ProductList extends React.Component {
  state = {
    categoriesList: [],
    searchInput: '',
    productList: [],
    shoppingCart: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categoriesList: categories,
    });
    const shoppingString = 'shopping-cart';
    const parsedCart = JSON.parse(localStorage.getItem(shoppingString));
    if (parsedCart) {
      this.setState({
        shoppingCart: parsedCart,
      });
      const cartString = JSON.stringify(parsedCart);
      localStorage.setItem(shoppingString, cartString);
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  getQuery = async () => {
    const { searchInput } = this.state;
    const productsArray = await getProductsFromCategoryAndQuery(undefined, searchInput);
    this.setState({
      productList: productsArray.results,
    });
  };

  getCategory = async (id) => {
    const productsArray = await getProductsFromCategoryAndQuery(id, undefined);
    this.setState({
      productList: productsArray.results,
    });
  };

  addToCart = (product) => {
    const { shoppingCart } = this.state;
    const shoppingString = 'shopping-cart';
    const foundIndex = shoppingCart.findIndex((element) => element.id === product.id);
    if (foundIndex >= 0) {
      shoppingCart[foundIndex].quantity += 1;
      this.setState({
        shoppingCart,
      });
      const cartString = JSON.stringify(shoppingCart);
      localStorage.setItem(shoppingString, cartString);
    } else {
      const { title, price, id } = product;
      const produto = {
        title,
        price,
        id,
        quantity: 1,
      };
      const newCart = [...shoppingCart, produto];
      this.setState({
        shoppingCart: newCart,
      });
      const cartString = JSON.stringify(newCart);
      localStorage.setItem(shoppingString, cartString);
    }
  };

  render() {
    const {
      categoriesList,
      searchInput,
      productList,
    } = this.state;

    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho
        </Link>
        <ul>
          { categoriesList.map((cat) => (
            <button
              onClick={ () => this.getCategory(cat.id) }
              data-testid="category"
              key={ cat.id }
            >
              { cat.name }
            </button>
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
          onClick={ this.getQuery }
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <div>
          {
            productList.length === 0 ? <p>Nenhum produto foi encontrado</p> : (
              productList.map((product) => (
                <div key={ product.id }>
                  <NavLink
                    data-testid="product-detail-link"
                    to={ `/productDetail${product.id}` }
                  >
                    <div data-testid="product">
                      <p>{ product.title }</p>
                      <img src={ product.thumbnail } alt={ product.title } />
                      <p>{ product.price }</p>
                    </div>
                  </NavLink>
                  <button
                    data-testid="product-add-to-cart"
                    onClick={ () => this.addToCart(product) }
                  >
                    Adicionar ao Carrinho
                  </button>
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
