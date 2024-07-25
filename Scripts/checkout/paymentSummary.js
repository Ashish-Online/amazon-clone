import { cart, updateCartQuantity } from "../../Data/cart.js"
import { products } from "../../Data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../Data/deliveryOptions.js";

const paymentSummary = document.querySelector('.payment-summary');
const cartQuantity = document.querySelector('.js-cart-quantity');


let totalCartQuantity;

export function renderPaymentSummary() {
  cartQuantity.innerText = updateCartQuantity('CartQuantity top');

  let shippingCost;
  let totalShippingCost = 0;
  let costBeforeTax = 0;
  let estimatedTax;
  let orderTotalCost;

  cart.forEach(cartItem => {
    const productId = cartItem.productId;

    products.forEach((product) => {
      if (product.id === productId) {
        costBeforeTax += (product.priceCents * cartItem.quantity);
      }
    });

    deliveryOptions.forEach(deliveryOption => {
      if (deliveryOption.id === cartItem.deliveryOptionId) {
        shippingCost = deliveryOption.priceCents;
      }
    });
    totalShippingCost += shippingCost;
  });

  costBeforeTax = Number(formatCurrency(costBeforeTax));
  totalShippingCost = Number(formatCurrency(totalShippingCost));
  estimatedTax = Number(formatCurrency((costBeforeTax + totalShippingCost) * 10));


  
  orderTotalCost = (costBeforeTax + totalShippingCost + estimatedTax).toFixed(2);

  totalCartQuantity = updateCartQuantity('Pay summary');

  paymentSummary.innerHTML = `
    <div class="js-payment-info">
            <div class="payment-summary-title">Order Summary:</div>
            <div class="payment-summary-row">
              <div class="payment-summary-item-number">Items (<span class="item-number ">${totalCartQuantity}:</span>)</div>
              <div class="payment-summary-money">$${costBeforeTax}</div>
            </div>
            <div class="payment-summary-row">
              <div>Shipping & handling:</div>
              <div class="payment-summary-money">$${totalShippingCost}</div>
            </div>
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${(costBeforeTax + totalShippingCost).toFixed(2)}</div>
            </div>
            <div class="payment-summary-row">
              <div>Estimated tax(10%):</div>
              <div class="payment-summary-money">$${estimatedTax}</div>
            </div>
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${orderTotalCost}</div>
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
}