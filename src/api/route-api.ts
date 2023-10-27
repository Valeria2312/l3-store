import {BaseApi} from "./base-api";

const baseApi = new BaseApi()
class RouteApi {
    public navigatePages (url: string, data: any) {
        return baseApi.post({url, data});
    }
}
export default RouteApi;
