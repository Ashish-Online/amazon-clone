import { cart, removeItemFromCart, setItemStorage, updateDeliveryOption } from '../Data/cart.js';
import { products, } from '../Data/products.js';
import { deliveryOptions } from '../Data/deliveryOptions.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const orderSummary = document.querySelector('.order-summary');
const paymentSummary = document.querySelector('.payment-summary');

function renderOrderSummary(){

  let totalCartQuantity;
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
        <div class="delivery-date">Delivery date: ${deliveryDate(cartItem)}</div>
        <div class="cart-item-detail-grid">
          <img class="product-image" src="${matchingProduct.image}" alt="">
            <div class="cart-item-detail">
              <div class="product-name">${matchingProduct.name}
              </div>
              <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
              <div class="product-quantity">Quantity: <span class="quantity-number">${cartItem.quantity}</span>
                <span class="js-update-product-link link-primary">Update</span>
                <span class="js-delete-product-link link-primary">Delete</span>
              </div>
            </div>
            <div class="delivery-options">
            <div class="choose-delivery-option">Choose a delivery option:</div>
              <div 
              ${deliveryOptionsHtml(matchingProduct, cartItem)}
            </div>
        </div>
      </div>
    `
  });
  
  function deliveryDate(cartItem) {
    let dateString = 0;
    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOption.id === cartItem.deliveryOptionId) {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays, 'days'
        );
        dateString = deliveryDate.format('dddd, MMMM D');
        
      }
    })
    return dateString;
  }
  function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
  
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
  
      html += `
        <div class="delivery-option js-delivery-option"  data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"  
                ${isChecked ? 'checked' : ''} 
                name="delivery-option-${matchingProduct.id}" class="delivery-option-input">
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} Shipping</div>
                  </div>
              </div>
      `
    });
    return html;
  }
  
  paymentSummary.innerHTML = `
    <div class="js-payment-info">
            <div class="payment-summary-title">Order Summary:</div>
            <div class="payment-summary-row">
              <div class="payment-summary-item-number">Items (<span class="item-number js-cart-quantity">${totalCartQuantity}:</span>)</div>
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
  const cartQuantitys = document.querySelectorAll('.js-cart-quantity');
  
  
  orderSummary.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-delete-product-link')) {
      const productid = e.target.parentElement.parentElement.parentElement.parentElement.classList[1].slice(23);
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
      removeItemFromCart(productid);
    }
    updateCartQuantity();
  });
  
  
  
  orderSummary.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-update-product-link')) {
      const productid = e.target.parentElement.parentElement.parentElement.parentElement.classList[1].slice(23);
      const spanUpdateQuantity = e.target.previousElementSibling;
  
      let quantityNum;
      cart.forEach((cartItem) => {
        if (cartItem.productId === productid) {
          quantityNum = cartItem.quantity;
        }
      });
  
      if (e.target.innerText === 'Update') {
        spanUpdateQuantity.innerText = '';
        e.target.innerText = 'Save';
        const inputNode = document.createElement('input');
        inputNode.className = 'span-update-quantity';
        inputNode.value = quantityNum;
        spanUpdateQuantity.appendChild(inputNode);
      }
      else if (e.target.innerText === 'Save') {
        e.target.innerText = 'Update';
        spanUpdateQuantity.innerText = `${spanUpdateQuantity.children[0].value}`;
      }
  
      cart.forEach((cartItem) => {
        if (productid === cartItem.productId) {
          cartItem.quantity = Number(spanUpdateQuantity.innerText);
        }
      });
      updateCartQuantity();
    }
  });
  
  function updateCartQuantity() {
    totalCartQuantity = 0;
  
    cart.forEach((cartItem) => {
      totalCartQuantity += cartItem.quantity;
    });
  
    if (cartQuantitys) {
      cartQuantitys.forEach((cartQuantity) => {
        cartQuantity.innerText = totalCartQuantity;
      });
    } else {
      console.error('Element with class "js-cart-quantity" not found.');
    }
    setItemStorage(cart);
  }
  
  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
  
  updateCartQuantity();
}

renderOrderSummary();