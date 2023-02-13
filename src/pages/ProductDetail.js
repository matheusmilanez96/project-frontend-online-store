import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    productName: '',
    productImg: '',
    productPrice: '',
    productId: '',
    productDetails: [],
    shoppingCart: [],
  };

  componentDidMount() {
    const shoppingString = 'shopping-cart';
    const parsedCart = JSON.parse(localStorage.getItem(shoppingString));
    if (parsedCart) {
      this.setState({
        shoppingCart: parsedCart,
      });
      const cartString = JSON.stringify(parsedCart);
      localStorage.setItem(shoppingString, cartString);
    }
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getProductById(id);
    this.setState({
      productName: results.title,
      productImg: results.thumbnail,
      productPrice: results.price,
      productId: id,
      productDetails: results.attributes,
    });
  };

  addToCart = (title, price, id) => {
    const shoppingString = 'shopping-cart';
    const { shoppingCart } = this.state;
    const foundIndex = shoppingCart.findIndex((element) => element.id === id);
    if (foundIndex >= 0) {
      shoppingCart[foundIndex].quantity += 1;
      this.setState({
        shoppingCart,
      });
      const cartString = JSON.stringify(shoppingCart);
      localStorage.setItem(shoppingString, cartString);
    } else {
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
      productImg,
      productName,
      productPrice,
      productId,
      productDetails,
      shoppingCart,
    } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ productName }</p>
        <img data-testid="product-detail-image" src={ productImg } alt={ productName } />
        <p data-testid="product-detail-price">{ productPrice }</p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(
            productName,
            productPrice,
            productId,
            shoppingCart,
          ) }
        >
          Adicionar ao Carrinho
        </button>
        { productDetails.map((detail) => (
          <li key={ detail.id }>{ `${detail.name} ${detail.value_id} ` }</li>
        )) }
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default ProductDetail;
