import React from 'react';
import { Link } from 'react-router-dom';
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
    const foundIndex = shoppingCart.findIndex((element) => element.id === product.id);
    if (foundIndex >= 0) {
      shoppingCart[foundIndex].quantity += 1;
      this.setState({
        shoppingCart,
      });
      const cartString = JSON.stringify(shoppingCart);
      localStorage.setItem('shopping-cart', cartString);
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
      localStorage.setItem('shopping-cart', cartString);
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
                <div data-testid="product" key={ product.id }>
                  <p>{ product.title }</p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ product.price }</p>
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
