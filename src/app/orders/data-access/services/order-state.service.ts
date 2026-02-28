import { Injectable, signal, computed, linkedSignal } from '@angular/core';
import { OrderCreate, DropCreate, ItemCreate } from '../../domain/interfaces';
import { ORDER_INIT, PERIOD_CONFIGURATION } from '../../utils/constants';
import { calculateSubtotal } from '../../utils/helpers/calculateSubotal';

@Injectable()
export class OrderStateService {
  private readonly _ivaRate = signal(0.19);
  internalOrderModel = signal<OrderCreate>(ORDER_INIT);

  public orderModel = this.internalOrderModel.asReadonly();
  public itemsSignal = computed(() => this.internalOrderModel().items);
  public periods = signal(PERIOD_CONFIGURATION).asReadonly();

  public subtotal = computed(() => calculateSubtotal(this.internalOrderModel().items));

  public total = linkedSignal({
    source: () => this.subtotal(),
    computation: (sub) => {
      const tax = this._ivaRate();
      return Number((sub + (sub * tax)).toFixed(2));
    }
  });

  public onManualTotalEdit(value: number) {
    this.total.set(value);
  }

  public updateOrder(updater: (state: OrderCreate) => OrderCreate) {
    this.internalOrderModel.update(updater);
  }

  public setOrder(order: OrderCreate) {
    this.internalOrderModel.set(order);
  }

  public resetToInitialData() {
    this.internalOrderModel.set(ORDER_INIT);
  }


  public resetItemsDrops(dropsTemplate: DropCreate[]) {
    this.internalOrderModel.update(state => ({
      ...state,
      items: state.items.map(item => ({
        ...item,
        drops: dropsTemplate.map(d => ({ ...d }))
      }))
    }));
  }

  public addItem(newItem: ItemCreate) {
    this.internalOrderModel.update(state => ({
      ...state,
      items: [...state.items, newItem]
    }));
  }

  public removeItem(index: number) {
    this.internalOrderModel.update(state => ({
      ...state,
      items: state.items.filter((_, i) => i !== index)
    }));
  }
}
