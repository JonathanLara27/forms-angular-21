import { ItemSchema } from ".";
import { OrderCreate } from "../interfaces";
import { required, pattern, SchemaPathTree, applyEach, minLength } from '@angular/forms/signals';

export const ORDER_INIT : OrderCreate  = {
    numero_orden: '',
    subtotal: 0,
    items: [],
    period_id: '2',
}

export const orderValidationSchema = (schemaPath: SchemaPathTree<OrderCreate>) => {
    required(schemaPath.numero_orden, {
        message: 'El número de orden es obligatorio'
    });

    pattern(schemaPath.numero_orden, /^OP-\d{4}$/, {
        message: 'El número de orden debe tener el formato OP-XXXX donde X es un número'
    });

    minLength(schemaPath.items, 1, {
        message: 'Debe agregar al menos un ítem a la orden'
    });

    applyEach(schemaPath.items, ItemSchema);
};