import { cart, removeItemFromCart } from '../Data/cart.js';
import { products } from '../Data/products.js';
import { formatCurrency } from './utils/money.js';

const orderSummary = document.querySelector('.order-summary');
const paymentSummary = document.querySelector('.payment-summary');

orderSummary.innerHTML = '';

let shippingCost = 0.00;
let costBeforeTax = 0;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
      if (product.priceCents < 2000) {
        shippingCost += 4000;
      }
      costBeforeTax += product.priceCents;
    }
  });
  orderSummary.innerHTML +=
  `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>
      <div class="cart-item-detail-grid">
        <img class="product-image" src="${matchingProduct.image}" alt="">
          <div class="cart-item-detail">
            <div class="product-name">${matchingProduct.name}
            </div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">Quantity: <span class="quantity-number"><input type='number' value=2 con></span>
              <a href="#" class="js-update-product-link">Update</a>
              <a href="#" class="js-delete-product-link">Delete</a>
            </div>
          </div>
          <div class="delivery-options">
            <div class="choose-delivery-option">Choose a delivery option:</div>
            <div class="delivery-option">
              <input type="radio" name="x" class="delivery-option-input">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
              <input type="radio" name="x" class="delivery-option-input">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
            <div class="delivery-option">
              <input type="radio" name="x" class="delivery-option-input">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
            </div>
          </div>
      </div>
    </div>
  `
});

paymentSummary.innerHTML = `
  <div class="js-payment-info">
          <div class="payment-summary-title">Order Summary:</div>
          <div class="payment-summary-row">
            <div class="payment-summary-item-number">Items (<span class="item-number">${cart.length}:</span>)</div>
            <div class="payment-summary-money">$${costBeforeTax / 100}</div>
          </div>
          <div class="payment-summary-row">
            <div>Shipping & handling:</div>
            <div class="payment-summary-money">$${shippingCost / 100}</div>
          </div>
          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${costBeforeTax / 100}</div>
          </div>
          <div class="payment-summary-row">
            <div>Estimated tax(10%):</div>
            <div class="payment-summary-money">$${costBeforeTax * 0.001}</div>
          </div>
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${((costBeforeTax / 100) + (costBeforeTax * 0.001)).toFixed(2)}</div>
          </div>
        </div>
        <div class="paypal-toggle">
          "Use Paypal"
          <input type="checkbox" class="js-paypal-toggle">
        </div>
        <div class="">
          <button class="js-place-order-button place-order-button button-primary" data-testid="place-order-button">
            Place your order
          </button>
        </div>
      </div>
`;

const itemContainers = document.querySelectorAll('.cart-item-container');

orderSummary.addEventListener('click', (e)=>{
  if(e.target.classList.contains('js-delete-product-link')){
    const productid = e.target.parentElement.parentElement.parentElement.parentElement.classList[1].slice(23);
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    removeItemFromCart(productid);
  }
});