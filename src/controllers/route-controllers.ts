import RouteApi from '../api/route-api'

class RouteAPI {
    RouteApi: RouteApi
    constructor() {
        this.RouteApi = new RouteApi;
    }
    async navigatePages(route: string) {
        const data: any = {};
        const url = "/api/sendEvent"
        data.type = "route"
        data.payload = route;
        data.timestamp = Date.now()

        try {
            await this.RouteApi.navigatePages(url, data)
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new RouteAPI
