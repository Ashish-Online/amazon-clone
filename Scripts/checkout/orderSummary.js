import { cart, removeItemFromCart, updateDeliveryOption, updateCartQuantity } from '../../Data/cart.js';
import { getProduct } from '../../Data/products.js';
import { deliveryOptions } from '../../Data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const orderSummary = document.querySelector('.order-summary');

export function renderOrderSummary() {

  orderSummary.innerHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
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

  orderSummary.addEventListener('click', (e) => {

    if (e.target.classList.contains('js-delete-product-link')) {
      console.log('Delete');
      const productid = e.target.parentElement.parentElement.parentElement.parentElement.classList[1].slice(23);
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
      removeItemFromCart(productid);
      renderPaymentSummary();
      updateCartQuantity('When delete');
    }
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
        cart.forEach((cartItem) => {
          if (productid === cartItem.productId) {
            cartItem.quantity = Number(spanUpdateQuantity.innerText);
          }
        });
        updateCartQuantity('When Updated');
        renderPaymentSummary();
      }

    }
  });



  document.querySelectorAll('.js-delivery-option').forEach((element) => {

    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
