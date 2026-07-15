import { Component, input } from '@angular/core';
import type { LevelCode } from '../../../core/models';

@Component({
  selector: 'app-level-badge',
  standalone: true,
  template: `
    <span class="level-badge" [class]="'level-badge--' + level().toLowerCase()">
      {{ level() }}
    </span>
  `,
  styles: [`
    .level-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.2em 0.6em;
      border-radius: 6px;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-bold);
      letter-spacing: 0.04em;
      text-transform: uppercase;

      &--a1 { background: var(--color-a1-light); color: var(--color-a1); }
      &--a2 { background: var(--color-a2-light); color: var(--color-a2); }
      &--b1 { background: var(--color-b1-light); color: var(--color-b1); }
      &--b2 { background: var(--color-b2-light); color: var(--color-b2); }
    }
  `],
})
export class LevelBadgeComponent {
  readonly level = input.required<LevelCode>();
}
