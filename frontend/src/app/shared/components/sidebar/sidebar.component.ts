import { Component, input, output, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurriculumService } from '../../../core/services/curriculum.service';
import { ProgressService } from '../../../core/services/progress.service';
import { BidiTextDirective } from '../../directives/bidi-text.directive';

interface NavLevel {
  id: string;
  code: string;
  title: string;
  color: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BidiTextDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly isOpen = input(false);
  readonly closeRequested = output<void>();

  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly navLevels = computed<NavLevel[]>(() =>
    this.curriculumService.levels().map((l) => ({
      id: l.id,
      code: l.code,
      title: l.title,
      color: l.color,
    }))
  );

  onLinkClick(): void {
    this.closeRequested.emit();
  }
}
