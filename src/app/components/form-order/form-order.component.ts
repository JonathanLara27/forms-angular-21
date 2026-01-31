import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormOrderService } from './form-order.service';
import { FormField, } from '@angular/forms/signals';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    FormsModule,

    FormFieldErrorComponent,
  ],
  providers: [FormOrderService],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOrderComponent {

  private service = inject(FormOrderService);

  public orderForm = this.service.orderForm;

  public orderModel = this.service.orderModel;

  public subtotal = this.service.subtotal;
  public total = this.service.total;

  public periods = this.service.periods;

  public additem = () => this.service.addItem();
  public deleteItem = (index: number) => this.service.deleteItem(index);
  public onSubmit = () => this.service.onSubmit();

 }
