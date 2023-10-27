import {BaseApi} from "./base-api";

const baseApi = new BaseApi()

class OrderApi {
    public makeOrder (url :string, data: any) {
        console.log(url, data)
        return baseApi.post({ url, data});
    }
}
export default OrderApi;
