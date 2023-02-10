import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  state = {
    productName: '',
    productImg: '',
    productPrice: '',
    productDetails: [],
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getProductById(id);
    console.log(results);
    this.setState({
      productName: results.title,
      productImg: results.thumbnail,
      productPrice: results.price,
      productDetails: results.attributes,
    });
  };

  render() {
    const { productImg, productName, productPrice, productDetails } = this.state;
    console.log(productDetails);
    return (
      <div>
        <p data-testid="product-detail-name">{ productName }</p>
        <img data-testid="product-detail-image" src={ productImg } alt={ productName } />
        <p data-testid="product-detail-price">{ productPrice }</p>
        { productDetails.map((detail) => (
          <li key={ detail.id }>{ `${detail.name} ${detail.value_id} ` }</li>
        )) }
        <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.string.isRequired,
};

export default ProductDetail;
