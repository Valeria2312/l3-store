import { Component } from '../component';
import html from './favorites.tpl.html';
import {favoriteService} from "../../services/favorite.service";
import {ProductData} from "../../../types";
import {Product} from "../product/product";

class Favorites extends Component {
    products!: ProductData[];

    update() {
        this.render()
    }

    async render() {
        this.view.deleteFull.onclick = this.deleteFull.bind(this)
        this.products = await favoriteService.get();
        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
            const productComp = new Product(product);
            productComp.render();
            productComp.attach(this.view.cart);
        });
    }
    deleteFull() {
        favoriteService.deleteFull()
        this.update()
        console.log(this.products)
    }
}
export const favoritesComp = new Favorites(html);
