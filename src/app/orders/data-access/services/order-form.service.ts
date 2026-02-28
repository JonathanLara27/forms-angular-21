import { Injectable, inject } from '@angular/core';
import { form } from '@angular/forms/signals';
import { OrderStateService } from './order-state.service';
import { orderValidationSchema } from '../../utils/constants';

@Injectable()
export class OrderFormService {
    private orderState = inject(OrderStateService);
    public orderForm = form(this.orderState.internalOrderModel, orderValidationSchema);

    public markAsTouched() {
        this.orderForm().markAsTouched();
        this.orderForm.items().markAsTouched();

    }

    public resetForm() {
        this.orderState.resetToInitialData();
        this.orderForm().reset();
    }
}
