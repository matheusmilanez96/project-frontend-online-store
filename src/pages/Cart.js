import React from 'react';

class Cart extends React.Component {
  state = {
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
  }

  increaseQty = (product, cart, string) => {
    const foundIndex = cart.findIndex((element) => element.id === product.id);
    cart[foundIndex].quantity += 1;
    this.setState({
      shoppingCart: cart,
    });
    const cartString = JSON.stringify(cart);
    localStorage.setItem(string, cartString);
  };

  decreaseQty = (product, cart, string) => {
    const foundIndex = cart.findIndex((element) => element.id === product.id);
    if (cart[foundIndex].quantity > 1) {
      cart[foundIndex].quantity -= 1;
      this.setState({
        shoppingCart: cart,
      });
      const cartString = JSON.stringify(cart);
      localStorage.setItem(string, cartString);
    }
  };

  removeFromCart = (product, cart, string) => {
    const foundIndex = cart.findIndex((element) => element.id === product.id);
    cart.splice(foundIndex, 1);
    this.setState({
      shoppingCart: cart,
    });
    const cartString = JSON.stringify(cart);
    localStorage.setItem(string, cartString);
  };

  render() {
    const { shoppingCart } = this.state;
    const shoppingString = 'shopping-cart';
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
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseQty(
                      product,
                      shoppingCart,
                      shoppingString,
                    ) }
                  >
                    -
                  </button>
                  <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseQty(
                      product,
                      shoppingCart,
                      shoppingString,
                    ) }
                  >
                    +
                  </button>
                  <br />
                  <br />
                  <button
                    data-testid="remove-product"
                    onClick={ () => this.removeFromCart(
                      product,
                      shoppingCart,
                      shoppingString,
                    ) }
                  >
                    Excluir
                  </button>
                </div>
              ))
            )
        }
      </div>
    );
  }
}

export default Cart;
