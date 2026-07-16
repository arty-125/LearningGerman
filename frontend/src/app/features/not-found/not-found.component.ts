import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="not-found__content">
        <div class="not-found__code" aria-hidden="true">404</div>
        <h1 class="not-found__title">Seite nicht gefunden</h1>
        <p class="not-found__subtitle">Page not found</p>
        <p class="not-found__description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a routerLink="/" class="not-found__home-btn">
          ← Back to Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: var(--color-background);

      &__content {
        text-align: center;
        max-width: 480px;
      }

      &__code {
        font-size: 8rem;
        font-weight: 800;
        color: var(--color-border);
        line-height: 1;
        margin-bottom: 1rem;
        letter-spacing: -4px;
      }

      &__title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text);
        margin: 0 0 0.5rem;
      }

      &__subtitle {
        font-size: 1.125rem;
        color: var(--color-primary);
        font-style: italic;
        margin: 0 0 1.5rem;
      }

      &__description {
        color: var(--color-text-secondary);
        margin: 0 0 2rem;
        line-height: 1.6;
      }

      &__home-btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: var(--color-primary);
        color: white;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: background 150ms ease;

        &:hover { background: var(--color-primary-hover); }
      }
    }
  `],
})
export class NotFoundComponent {}
