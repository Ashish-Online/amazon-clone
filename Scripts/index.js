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
        <select name="cars" id="quantity-number" class="js-quantity-selector-${product.id}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <div class="added-to-cart-message"></div>
        <button type="button" data-product-id="${product.id}" data-quantity-number="js-quantity-selector-${product.id}" class="add-to-cart-btn js-add-to-cart-btn">Add to Cart</button>
      </div>
  `;

});
gridContainer.innerHTML = productsHTML;

const cartQuality = document.querySelector('.js-cart-quality');
const addToCartBtns = document.querySelectorAll('.js-add-to-cart-btn');
let totalCartQuality = 0;

function addToCart(button) {
  const productId = button.dataset.productId;
  const selectQuantity = button.dataset.quantityNumber;
  const quantityNumber = document.querySelector(`.${selectQuantity}`);  

  let matchingItem;
  totalCartQuality = 0;

  cart.forEach((item) => {
    if (productId === item.id) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(quantityNumber.value);
  } else {
    cart.push({
      id: productId,
      quantity: Number(quantityNumber.value)
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
