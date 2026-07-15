import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  // Inject ThemeService here so it initializes eagerly and applies the
  // data-theme attribute to the document before first render.
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // ThemeService constructor applies the theme; nothing else needed here.
  }
}
