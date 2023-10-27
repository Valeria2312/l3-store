import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import {formatPrice, getIdProduct} from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import OrderAPI from '../../controllers/order-controllers';

class Checkout extends Component {
  products!: ProductData[];
  totalPrice: number | undefined;
  data: any

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    this.totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);

    this.view.price.innerText = formatPrice(this.totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();
    this.data.totalPrice = this.totalPrice!
    this.data.productIds = getIdProduct(this.products)

    OrderAPI.makeOrder(this.data);
    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
