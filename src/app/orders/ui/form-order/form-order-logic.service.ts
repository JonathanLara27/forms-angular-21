import { Injectable, inject } from '@angular/core';
import { submit } from '@angular/forms/signals';
import { DropService } from '../../data-access/services/drop.service';
import { OrderFormService } from '../../data-access/services/order-form.service';
import { OrderStateService } from '../../data-access/services/order-state.service';
import { ItemCreate, OrderCreate } from '../../domain/interfaces';
import { INIT_ITEM } from '../../utils/constants';

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

    this.orderStateService.resetItemsDrops(dropsTemplate);
  }

  public onManualTotalEdit(value: number) {
    this.orderStateService.onManualTotalEdit(value);
  }

  public addItem() {
    const currentPeriodId = Number(this.orderModel().period_id);
    const newItem = this.createItemWithDrops(currentPeriodId);

    this.orderStateService.addItem(newItem);
  }

  public deleteItem(index: number) {
    this.orderStateService.removeItem(index);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.orderForm().invalid()) {
      this.orderFormService.markAsTouched();
      return;
    }

    submit(this.orderForm, async () => {
      const payload: OrderCreate = {
        ...this._orderModel(),
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
      drops: this.dropService.generateDropsForPeriod(periodId)
    };
  }

  public onPeriodChange(newPeriodIdRaw: string) {
    const periodIdNum = Number(newPeriodIdRaw);
    if (!periodIdNum) return;
    this.resetDropsInItems(periodIdNum);
  }
}