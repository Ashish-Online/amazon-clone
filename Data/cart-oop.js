export class Cart {
  cartItems;

  localStorageKey = undefined;

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
      ];
    }
  }

  updateCartQuantity(text) {
    let totalCartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      totalCartQuantity += cartItem.quantity;
    });

    setItemStorage(this.cartItems);

    return totalCartQuantity;
  }

  setItemStorage(cartItems) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cartItems));
  }

  addToCart(productId, quantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    setItemStorage(this.cartItems);
  }

  removeItemFromCart(productid) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productid) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    setItemStorage(this.cartItems);
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    setItemStorage(this.cartItems);
  }

}

loadFromStorage();

