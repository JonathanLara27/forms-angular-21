import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormOrderComponent } from '../../ui/form-order/form-order.component';

@Component({
  selector: 'app-container-form',
  standalone: true,
  imports: [
    CommonModule,


    FormOrderComponent,
  ],
  templateUrl: './container-form.component.html',
  styleUrl: './container-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContainerFormComponent {

  public showChat = signal(false);
  public textShowChat = computed(() => this.showChat() ? 'Ocultar Chat' : 'Mostrar Chat');

  public toggleShowChat() {
    this.showChat.set(!this.showChat());
  }

}
