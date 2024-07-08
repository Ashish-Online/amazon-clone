const products = [
  {
    image: 'Images/products/plain-hooded-fleece-sweatshirt-yellow.jpg',
    name: 'Plain Hooded Fleece Sweatshirt',
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090 
  },
  {
    image: 'Images/products/intermediate-composite-basketball.jpg',
    name: 'Plain Hooded Fleece Sweatshirt',
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095
  },
  {
    image: 'Images/products/men-golf-polo-t-shirt-blue.jpg',
    name: 'Plain Hooded Fleece Sweatshirt',
    rating: {
      stars: 4.5,
      count: 85
    },
    priceCents: 799 
  },
  // {
  //   image: '',
  //   name: ,
  //   rating: {
  //     stars: ,
  //     count: 
  //   },
  //   priceCents: 
  // }
];

const gridContainer = document.querySelector('.js-grid-container');

let productsHTML = '';

products.forEach((product)=>{
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container"><img class="product-image" src="${product.image}" alt=""></div>
        <div class="product-title">${product.name}</div>
        <div class="rating"><span class="rating-star"><img src="Images/ratings/rating-${product.rating.stars*10}.png" alt=""></span>
        <span class="rating-number pointer">${product.rating.count}</span></div>
        <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>
        <select name="cars" id="quantity-number">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="1">3</option>
          <option value="4">4</option>
        </select>
        <div class="added-to-cart-message"></div>
        <button type="button" class="added-to-cart-btn">Add to Cart</button>
      </div>
  `;
});
gridContainer.innerHTML = productsHTML;