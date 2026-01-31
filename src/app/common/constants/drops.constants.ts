import { SchemaPathTree, min, required } from "@angular/forms/signals";
import { DropCreate } from "../interfaces";

export const INIT_DROP : DropCreate = {
    name: '',
    month: 1,
    quantity: 0
};

export const PERIODS = [
    'Periodo 1',
    'Periodo 2',
]

export const MONTHS : Map<number, string> = new Map([
    [1, 'Enero'],
    [2, 'Febrero'],
    [3, 'Marzo'],
    [4, 'Abril'],
    [5, 'Mayo'],
    [6, 'Junio'],
    [7, 'Julio'],
    [8, 'Agosto'],
    [9, 'Septiembre'],
    [10, 'Octubre'],
    [11, 'Noviembre'],
    [12, 'Diciembre'],
]);

export const MONTHS_PERIOD_I = [1,2,3,4,5,6];
export const MONTHS_PERIOD_II = [7,8,9,10,11,12];

const MIN_QUANTITY = 0;

export const DropsSchema = (drop: SchemaPathTree<DropCreate>) => {

    required(drop.quantity, { message: 'La cantidad es requerida' });

    min(drop.quantity, MIN_QUANTITY, { message: `La cantidad minima es ${MIN_QUANTITY}` });
}