import { Drop, DropCreate } from ".";

export interface Item {
    id: number,
    nombre: string,
    precio: number,
    cantidad: number,
    drops : Drop[]
}

export interface ItemCreate extends Omit<Item, 'id' | 'drops'> {
    drops: DropCreate[]
}
export interface ItemUpdate extends Partial<ItemCreate> {}