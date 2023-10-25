import {BaseApi} from "./base-api";

const baseApi = new BaseApi()
class ProductApi {
    public viewProduct  (url: string, data: any) {
        return baseApi.post({url, data});
    }
    public addToCard (url: string, data: any) {
        return baseApi.post({url, data});
    }
    public getProductSecretKey(url: string, data:any) {
        return baseApi.post({url, data});
    }
}
export default ProductApi
