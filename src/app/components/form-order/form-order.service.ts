import { Injectable, computed, signal, effect, inject, untracked } from '@angular/core';
import { INIT_DROP, INIT_ITEM, MONTHS_LIST, ORDER_INIT, PERIOD_CONFIGURATION, orderValidationSchema } from '../../common/constants';
import { form } from '@angular/forms/signals';
import { calculateSubtotal } from '../../common/helpers/calculateSubotal';
import { OrderCreate, ItemCreate, DropCreate } from '../../common/interfaces';

@Injectable()
export class FormOrderService {

  private readonly _ivaRate = signal(0.19);

  private _orderModel = signal<OrderCreate>(ORDER_INIT);

  public orderModel = this._orderModel.asReadonly();

  public orderForm = form(this._orderModel, orderValidationSchema);

  public itemsSignal = computed(() => this._orderModel().items);

  public periods = signal(PERIOD_CONFIGURATION).asReadonly();

  public subtotal = computed(() => {
    return calculateSubtotal(this._orderModel().items);
  });

  public total = computed(() => {
    const sub = this.subtotal();
    const tax = this._ivaRate();
    return Number((sub + (sub * tax)).toFixed(2));
  });
  
  constructor() {
    effect(() => {
      const periodIdRaw = this.orderForm.period_id().value();
      const periodId = Number(periodIdRaw);
      untracked(() => {
        if (periodId) {
          this.resetDropsInItems(periodId);
        }
      });
    }, { allowSignalWrites: true });
  }

  private resetDropsInItems(periodId: number) {
    const dropsTemplate = this.generateDropsForPeriod(periodId);

    if (dropsTemplate.length === 0) return;

    this._orderModel.update(state => {
      if (state.items.length === 0) return state;

      const updatedItems = state.items.map(item => ({
        ...item,
        drops: dropsTemplate.map(d => ({ ...d }))
      }));

      return {
        ...state,
        items: updatedItems
      };
    });
  }
  

  public addItem() {
    // 1. Obtenemos la configuración actual
    const currentPeriodId = Number(this._orderModel().period_id);

    // 2. SRP: Delegamos la creación del item con sus drops a una función pura
    const newItem = this.createItemWithDrops(currentPeriodId);

    // 3. Inmutabilidad: Spread operator
    this._orderModel.update(state => ({
      ...state,
      items: [...state.items, newItem]
    }));
  }

  public deleteItem(index: number) {
    // Inmutabilidad: Filter en lugar de Splice
    this._orderModel.update(state => ({
      ...state,
      items: state.items.filter((_, i) => i !== index)
    }));
  }

  public resetForm() {
    this._orderModel.set(ORDER_INIT);
  }

  async onSubmit() {
    // Validación usando el estado del signal form
    if (this.orderForm().invalid()) {
      this.orderForm().markAsTouched();
      return;
    }

    // Preparar payload
    const payload: OrderCreate = {
      ...this._orderModel(), // Raw data
      // Aseguramos tipos correctos
      period_id: this._orderModel().period_id,
      subtotal: this.subtotal(),
    };

    console.log("🚀 Payload:", payload);
    this.resetForm();
  }

  private generateDropsForPeriod(periodId: number): DropCreate[] {
    const period = PERIOD_CONFIGURATION.find(p => p.id === periodId);

    if (!period) return [];

    return period.monthRange.map(monthValue => {
      const monthLabel = MONTHS_LIST.find(m => m.value === monthValue)?.label || '';
      return {
        name: monthLabel,
        month: monthValue,
        quantity: INIT_DROP.quantity
      };
    });
  }

  private createItemWithDrops(periodId: number): ItemCreate {
    return {
      ...INIT_ITEM,
      drops: this.generateDropsForPeriod(periodId) // <--- Reutilización
    };
  }
}