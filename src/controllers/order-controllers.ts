import OrderApi from '../api/order-api'
import {genOrderID} from "../utils/helpers";
class OrderAPI {
    OrderApi: OrderApi;
    constructor() {
        this.OrderApi = new OrderApi;
    }
    async makeOrder (dataProduct: any) {
        const url = "/api/makeOrder";
        const type = "purchase";
        const data: any = {};

        dataProduct.orderId = genOrderID()
        data.type = type;
        data.payload = dataProduct;
        data.timestamp = Date.now()

        try {
            await this.OrderApi.makeOrder(url, data)
        }
        catch (error) {
            console.log(error);
        }
    }

}
export default new OrderAPI();
