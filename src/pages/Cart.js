import React from 'react';

class Cart extends React.Component {
  render() {
    const parsedCart = JSON.parse(localStorage.getItem('shopping-cart'));
    let shoppingCart;
    if (!parsedCart) {
      shoppingCart = [];
    } else {
      shoppingCart = parsedCart;
    }
    return (
      <div>
        {
          shoppingCart.length === 0
            ? (
              <p data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </p>
            ) : (
              shoppingCart.map((product) => (
                <div data-testid="product" key={ product.id }>
                  <p data-testid="shopping-cart-product-name">{ product.title }</p>
                  <p>{ product.price }</p>
                  <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default Cart;
