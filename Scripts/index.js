const gridContainer = document.querySelector('.js-grid-container');

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container"><img class="product-image" src="${product.image}" alt=""></div>
        <div class="product-title">${product.name}</div>
        <div class="rating"><span class="rating-star"><img src="Images/ratings/rating-${product.rating.stars * 10}.png" alt=""></span>
        <span class="rating-number pointer">${product.rating.count}</span></div>
        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
        <select name="cars" id="quantity-number">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="1">3</option>
          <option value="4">4</option>
        </select>
        <div class="added-to-cart-message"></div>
        <button type="button" data-product-id="${product.id}" class="add-to-cart-btn js-add-to-cart-btn">Add to Cart</button>
      </div>
  `;

});
gridContainer.innerHTML = productsHTML;

const cartQuality = document.querySelector('.js-cart-quality');
const addToCartBtns = document.querySelectorAll('.js-add-to-cart-btn');
let totalCartQuality=0;

function addToCart(button) {
  const productId = button.dataset.productId;
  let matchingItem;
  totalCartQuality=0;

  cart.forEach((item) => {
    if (productId === item.id) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  cart.forEach((item) => {
    totalCartQuality += item.quantity;
  });
  cartQuality.innerHTML = `${totalCartQuality}`;
}


addToCartBtns.forEach((button) => {
  button.addEventListener('click', () => {
    button.previousElementSibling.innerHTML = `<img src="Images/icons/checkmark.png"> Added`;
    setTimeout(() => {
      button.previousElementSibling.innerHTML = ``;
    }, 2000);

    addToCart(button);
  });
});
