import { Injectable, effect, inject, untracked } from '@angular/core';
import { OrderCreate, ItemCreate } from '../../common/interfaces';
import { OrderStateService } from '../../common/services/order-state.service';
import { DropService } from '../../common/services/drop.service';
import { OrderFormService } from '../../common/services/order-form.service';
import { INIT_ITEM } from '../../common/constants';
import { submit } from '@angular/forms/signals';

@Injectable()
export class FormOrderLogicService {

  private orderStateService = inject(OrderStateService);

  private dropService = inject(DropService);

  private orderFormService = inject(OrderFormService);

  private _orderModel = this.orderStateService.internalOrderModel;

  public orderModel = this._orderModel.asReadonly();

  public orderForm = this.orderFormService.orderForm;

  public itemsSignal = this.orderStateService.itemsSignal;

  public periods = this.orderStateService.periods;

  public subtotal = this.orderStateService.subtotal;
  public total = this.orderStateService.total;

  private resetDropsInItems(periodId: number) {
    const dropsTemplate = this.dropService.generateDropsForPeriod(periodId);
    if (dropsTemplate.length === 0) return;

    // Solo orquestamos: obtenemos la plantilla y mandamos a actualizar el estado
    this.orderStateService.resetItemsDrops(dropsTemplate);
  }

  public onManualTotalEdit(value: number) {
    this.orderStateService.onManualTotalEdit(value);
  }

  public addItem() {
    const currentPeriodId = Number(this.orderModel().period_id);
    const newItem = this.createItemWithDrops(currentPeriodId);

    // Delegación total al State Service
    this.orderStateService.addItem(newItem);
  }

  public deleteItem(index: number) {
    // Delegación total al State Service
    this.orderStateService.removeItem(index);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    // Validación usando el estado del signal form
    if (this.orderForm().invalid()) {
      this.orderFormService.markAsTouched();
      return;
    }
    
    submit(this.orderForm, async () => {
      // Preparar payload
      const payload: OrderCreate = {
        ...this._orderModel(), // Raw data
        // Aseguramos tipos correctos
        period_id: this._orderModel().period_id,
        subtotal: this.subtotal(),
      };
  
      console.log("🚀 Payload:", payload);
      this.orderFormService.resetForm();

    })
  }

  private createItemWithDrops(periodId: number): ItemCreate {
    return {
      ...INIT_ITEM,
      drops: this.dropService.generateDropsForPeriod(periodId) // <--- Reutilización
    };
  }

  public onPeriodChange(newPeriodIdRaw: string) {
    const periodIdNum = Number(newPeriodIdRaw);
    if (!periodIdNum) return;
    this.resetDropsInItems(periodIdNum);
  }
}