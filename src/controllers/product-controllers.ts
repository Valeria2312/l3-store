import ProductApi from "../api/product-api";
import {getProductSecretKey, isEmpty} from "../utils/helpers";

class ProductAPI {
    ProductApi: ProductApi
    url: string
    urlKey: string

    constructor() {
        this.ProductApi = new ProductApi
        this.url = "/api/sendEvent"
        this.urlKey = "/api/getProductSecretKey"
    }

    async viewProduct(product: any, key: string) {
        const data: any = {}

        if(!isEmpty(product.log)) {
            data.type = "viewCardPromo";
        } else {
            data.type = "viewCard";
        }
        product.secretKey = key
        data.payload = product;

        alert(JSON.stringify(data))

        // await this.getProductSecretKey(product.id)
        await this.ProductApi.viewProduct(this.url,data)

    }

    async addToCard(product: any) {
        const data: any = {}
        data.type = "addToCard";
        data.payload = product;

        await this.ProductApi.addToCard(this.url, data)

    }
    async getProductSecretKey(product: any) {
        //запрос
        // await this.ProductApi.getProductSecretKey(this.urlKey, product.id)
        //     .then(response => console.log(response))
        //получение ключа
        const key = getProductSecretKey(product.id)

        this.viewProduct(product, key)
    }
}
export default new ProductAPI
