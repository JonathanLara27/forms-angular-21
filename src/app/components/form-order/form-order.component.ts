import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormField, } from '@angular/forms/signals';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormsModule } from '@angular/forms';
import { OrderStateService } from '../../common/services/order-state.service';
import { DropService } from '../../common/services/drop.service';
import { OrderFormService } from '../../common/services/order-form.service';
import { FormOrderLogicService } from './form-order-logic.service';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    FormsModule,

    FormFieldErrorComponent,
  ],
  providers: [
    FormOrderLogicService,
    OrderStateService,
    DropService,
    OrderFormService,
  ],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOrderComponent {

  private service = inject(FormOrderLogicService);

  public orderForm = this.service.orderForm;

  public orderModel = this.service.orderModel;

  public subtotal = this.service.subtotal;
  public total = this.service.total;

  public periods = this.service.periods;

  public additem = () => this.service.addItem();
  public deleteItem = (index: number) => this.service.deleteItem(index);
  public onSubmit = (event: Event) => this.service.onSubmit(event);
  public onManualTotalEdit = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (isNaN(value)) return;
    this.service.onManualTotalEdit(value);
  };

 }
