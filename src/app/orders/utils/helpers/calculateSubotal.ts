import { ItemCreate } from "../../domain/interfaces";

export const calculateSubtotal = (items: ItemCreate[]): number => {
    return +(items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2));
};