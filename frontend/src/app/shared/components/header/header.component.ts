import { Component, output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ProgressService } from '../../../core/services/progress.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly menuToggled = output<void>();

  protected readonly themeService = inject(ThemeService);
  protected readonly progressService = inject(ProgressService);

  onMenuToggle(): void {
    this.menuToggled.emit();
  }
}
