import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  standalone: true,
  template: `
    @if (isInvalidAndTouched()) {
      <div class="error-container">
        @for (error of errors(); track $index) {
          <span class="error-text">{{ error.message }}</span>
        }
      </div>
    }
  `,
  styles: `
    .error-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: -1.1rem;
      left: 0.2rem;
      z-index: 1;
    }

    .error-text {
      color: var(--danger, #ef4444);
      font-size: 0.7rem;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-3px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
})
export class FormFieldErrorComponent {

  form = input.required<any>();
  field = input.required<string>();

  private control = computed(() => {
    const f = this.form();     
    const name = this.field(); 
    return f[name];           
  });

  isInvalidAndTouched = computed(() => {
    const ctrl = this.control();
    if (!ctrl) return false;
    return ctrl().invalid() && ctrl().touched();
  });

  errors = computed(() => {
    const ctrl = this.control();
    if (!ctrl) return [];

    const state = ctrl();
    const errs = state.errors();

    if (!errs) return [];

    return Object.values(errs).map((e: any) => ({
      message: e.message || 'Campo no válido'
    }));
  });


}