import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  route?: string | string[];
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb__list" role="list">
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb__item">
            @if (item.route && !last) {
              <a [routerLink]="item.route" class="breadcrumb__link">{{ item.label }}</a>
            } @else {
              <span class="breadcrumb__current" [attr.aria-current]="last ? 'page' : null">
                {{ item.label }}
              </span>
            }
            @if (!last) {
              <span class="breadcrumb__sep" aria-hidden="true">/</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      &__list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      &__item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      &__link {
        font-size: var(--font-size-sm);
        color: var(--color-primary);
        text-decoration: none;
        font-weight: var(--font-weight-medium);
        transition: opacity 150ms ease;

        &:hover { opacity: 0.8; }
      }

      &__current {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: var(--font-weight-medium);
      }

      &__sep {
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
      }
    }
  `],
})
export class BreadcrumbComponent {
  readonly items = input.required<BreadcrumbItem[]>();
}
