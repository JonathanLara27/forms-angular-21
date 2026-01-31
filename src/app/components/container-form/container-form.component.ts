import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormOrderComponent } from '../form-order/form-order.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-container-form',
  standalone: true,
  imports: [
    CommonModule,


    FormOrderComponent,
    // ChatComponent,
  ],
  templateUrl: './container-form.component.html',
  styleUrl: './container-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContainerFormComponent { }
