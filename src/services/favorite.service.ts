import {ProductData} from "../../types";
import localforage from "localforage";

const DB = '__wb-favorite';

class FavoriteService {
    init() {
       this.checkingFavorites()
    }

    async addProduct(product: ProductData) {
        const products = await this.get();
console.log(product)
        await this.set([...products, product]);
    }

    async removeProduct(product: ProductData) {
        const products = await this.get();

        await this.set(products.filter(({ id }) => id !== product.id));
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        console.log(data)
        await localforage.setItem(DB, data);
    }

    private async checkingFavorites () {
        const products = await this.get();
        if(products) {
            const container = document.querySelector(".header__buttons")
                // = `<a href="/favorites">Избранное</a>`
            const link = document.createElement('a');
            link.textContent = "Избранное";
            link.href = "/favorites"
            container?.prepend (link)
        }
        console.log(products)
    }
}
export const favoriteService = new FavoriteService();
