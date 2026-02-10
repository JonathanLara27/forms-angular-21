import { Injectable, signal, computed } from '@angular/core';
import { OrderCreate, ItemCreate, DropCreate } from '../interfaces';
import { ORDER_INIT, PERIOD_CONFIGURATION } from '../constants';
import { calculateSubtotal } from '../helpers/calculateSubotal';

@Injectable()
export class OrderStateService {
  private readonly _ivaRate = signal(0.19);
  // Solo accesible dentro de la carpeta de servicios
  internalOrderModel = signal<OrderCreate>(ORDER_INIT);

  // Para el resto de la app, es solo lectura
  public orderModel = this.internalOrderModel.asReadonly();
  public itemsSignal = computed(() => this.internalOrderModel().items);
  public periods = signal(PERIOD_CONFIGURATION).asReadonly();

  public subtotal = computed(() => calculateSubtotal(this.internalOrderModel().items));

  public total = computed(() => {
    const sub = this.subtotal();
    const tax = this._ivaRate();
    return Number((sub + (sub * tax)).toFixed(2));
  });


  public updateOrder(updater: (state: OrderCreate) => OrderCreate) {
    this.internalOrderModel.update(updater);
  }

  public setOrder(order: OrderCreate) {
    this.internalOrderModel.set(order);
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
