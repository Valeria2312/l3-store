const enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
// const jsonHeader = { 'Content-Type': 'application/json; charset=utf-8' };

type RequestData = any;

export class BaseApi {

    private getFetchOptions = (method: Method, data?: RequestData) => ({
        method,
        // headers: jsonHeader,
        body: JSON.stringify(data),
    });

    private checkResponse(response: Response) {
        if (response.status !== 200) {
            response.text().then((text: string) => {
                throw new Error(text);
            });
        }
        return response;
    }

    public async post({url, data }: {url: string, data?: RequestData }) {
        console.log(data)
        try {
             await fetch(
                `${url}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                }
            ).catch((error) => {
                 throw new Error(error);
             });
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`API Error: ${error.message}`);
            }
            throw new Error('Unknown API error');
        }
    }

    public async get(url: string) {
        try {
            const response = await fetch(
                `${url}`,
                this.getFetchOptions(Method.GET),
            ).catch((error) => {
                throw new Error(error);
            });
            return await this.checkResponse(response).json();
        } catch (error) {
            if (error instanceof Error) {
                throw new TypeError(`API Error: ${error.message}`);
            }
            throw new Error('Unknown API error');
        }
    }
//TODO: для других методов
//     public async put({ data }: { data: RequestData }) {
//         try {
//             const response = await fetch(
//                 `${url}`,
//                 this.getFetchOptions(Method.PUT, data),
//             ).catch((error) => {
//                 throw new Error(error);
//             });
//             return await this.checkResponse(response).json();
//         } catch (error) {
//             if (error instanceof Error) {
//                 throw new TypeError(`API Error: ${error.message}`);
//             }
//             throw new Error('Unknown API error');
//         }
//     }
//     public async delete({ data }: { data: RequestData }) {
//         try {
//             const response = await fetch(
//                 `${url}`,
//                 this.getFetchOptions(Method.DELETE, data),
//             ).catch((error) => {
//                 throw new Error(error);
//             });
//             return await this.checkResponse(response).json();
//         } catch (error) {
//             if (error instanceof Error) {
//                 throw new TypeError(`API Error: ${error.message}`);
//             }
//             throw new Error('Unknown API error');
//         }
//     }
}
