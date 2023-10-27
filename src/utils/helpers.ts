import {ProductData} from "../../types";

export const genUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
export const genOrderID = (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let orderNumber = '';
        for(let i = 0; i < length; i++) {
            orderNumber += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return orderNumber;
}

export const addElement = (parent: HTMLElement, tag: string, options?: object) => {
  const element = document.createElement(tag) as HTMLElement;

  if (options) Object.assign(element, options);

  parent.appendChild(element);

  return element;
};

export const formatPrice = (price: number) => {
  return (
    Math.round(price / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  );
};

export const getIdProduct = (products: ProductData[]) => {
   return  products.map((product) => {
        return product.id
    })
}
export const getProductSecretKey = (id: number) => Math.pow(id, 2).toString(16);

export function isEmpty(obj: any) {
    for (const prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return true
}
