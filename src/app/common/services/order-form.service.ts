// order-form.service.ts
import { Injectable, inject } from '@angular/core';
import { form } from '@angular/forms/signals';
import { OrderStateService } from './order-state.service';
import { orderValidationSchema } from '../constants';

@Injectable()
export class OrderFormService {
    private orderState = inject(OrderStateService);
    public orderForm = form(this.orderState.internalOrderModel, orderValidationSchema);

    public markAsTouched() {
        this.orderForm().markAsTouched();
    }

    public resetForm() {
        this.orderState.setOrder(
            {
                numero_orden: '',
                subtotal: 0,
                items: [],
                period_id: '2',
            }
        );
        this.orderForm().reset();
    }
}
