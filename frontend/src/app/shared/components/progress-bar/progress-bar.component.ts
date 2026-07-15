import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="progress-bar" [attr.aria-label]="ariaLabel()" role="progressbar"
         [attr.aria-valuenow]="value()" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar__track">
        <div
          class="progress-bar__fill"
          [class]="'progress-bar__fill--' + color()"
          [style.width.%]="clampedValue()"
        ></div>
      </div>
      @if (showLabel()) {
        <span class="progress-bar__label">{{ clampedValue() }}%</span>
      }
    </div>
  `,
  styles: [`
    .progress-bar {
      display: flex;
      align-items: center;
      gap: 8px;

      &__track {
        flex: 1;
        height: 8px;
        background: var(--color-surface-3);
        border-radius: 9999px;
        overflow: hidden;
      }

      &__fill {
        height: 100%;
        border-radius: 9999px;
        transition: width 600ms ease;
        animation: progress-fill 600ms ease forwards;

        &--primary { background: var(--color-primary); }
        &--a1      { background: var(--color-a1); }
        &--a2      { background: var(--color-a2); }
        &--b1      { background: var(--color-b1); }
        &--b2      { background: var(--color-b2); }
        &--success { background: var(--color-success); }
      }

      &__label {
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-secondary);
        min-width: 32px;
        text-align: right;
      }
    }
  `],
})
export class ProgressBarComponent {
  readonly value = input<number>(0);
  readonly color = input<string>('primary');
  readonly showLabel = input(false);

  readonly clampedValue = computed(() => Math.min(100, Math.max(0, Math.round(this.value()))));
  readonly ariaLabel = computed(() => `Progress: ${this.clampedValue()}%`);
}
