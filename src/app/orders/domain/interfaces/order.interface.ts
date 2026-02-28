import { Item, ItemCreate } from ".";

export interface Order {
    id: number,
    numero_orden: string,
    total: number,
    subtotal: number,
    iva: number,
    items: Item[],
    period_id: string
}

export interface OrderCreate extends Pick<Order, 'numero_orden' | 'subtotal' | 'period_id'> {
    items: ItemCreate[]
}
export interface OrderUpdate extends Partial<OrderCreate> {}