import {ProductData} from "../../types";
import localforage from "localforage";

const DB = '__wb-favorite';

class FavoriteService {
    init() {
       this.checkingFavorites()
    }

    async addProduct(product: ProductData) {
        const products = await this.get();

        await this.set([...products, product]);

        if(products.length === 0) {
            console.log("массив пустой")
            await this._addFavoritesLink()
        }
    }
    async removeProduct(product: ProductData) {
        const products = await this.get();

        await this.set(products.filter(({ id }) => id !== product.id));
        if(products.length === 1) {
            console.log("в массиве 1")
            await this._removeFavoritesLink()
        }
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        console.log(data)
        await localforage.setItem(DB, data);
    }
    private _addFavoritesLink () {
        const container = document.querySelector(".header__buttons");
        const link = document.createElement('a');
        link.className = "favorites";
        link.textContent = "Избранное";
        link.href = "/favorites";
        container?.prepend(link);
    }
    private _removeFavoritesLink() {
        const favoritesLink = document.querySelector(".favorites");
        favoritesLink?.remove();
    }
    private async checkingFavorites() {
        const products = await this.get();

        if (products.length >= 1 ) {
            this._addFavoritesLink()
        } else {
            this._removeFavoritesLink()
        }
    }
    async isProductFavorite(product: ProductData) {
        const products = await this.get();
        return products.some(p => p.id === product.id);
    }
    async deleteFull() {
        await localforage.removeItem(DB)
        this.checkingFavorites()
    }
}
export const favoriteService = new FavoriteService();
