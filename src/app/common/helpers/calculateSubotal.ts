import { Item, ItemCreate } from "../interfaces";

export const calculateSubtotal = (items: Item[] | ItemCreate[]): number => {
    return +(items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2));
};