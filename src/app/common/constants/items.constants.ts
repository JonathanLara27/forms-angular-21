import { SchemaPathTree, min, required, minLength, applyEach } from "@angular/forms/signals";
import { ItemCreate } from "../interfaces";
import { DropsSchema } from ".";

export const INIT_ITEM : ItemCreate  = {
    cantidad: 1,
    nombre: '',
    precio: 0,
    drops: []
};

const MIN_DROPS = 3;
const MIN_LENGTH_NAME = 3;
const MIN_QUANTITY = 1;
const MIN_PRICE = 0;

export const ItemSchema = (item: SchemaPathTree<ItemCreate>) => {
    required(item.nombre, { message: 'El nombre es requerido' });
    minLength(item.nombre, MIN_LENGTH_NAME, { message: `El nombre debe tener al menos ${MIN_LENGTH_NAME} caracteres` });
    min(item.cantidad, MIN_QUANTITY, { message: `La cantidad minima es ${MIN_QUANTITY}` });
    min(item.precio, MIN_PRICE, { message: `El precio minimo es ${MIN_PRICE}` });

    minLength(item.drops, MIN_DROPS, { message: `Se requieren al menos ${MIN_DROPS} drops` });

    applyEach(item.drops, DropsSchema);
};