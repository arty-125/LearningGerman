import { Component, inject, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BidiTextDirective } from '../../shared/directives/bidi-text.directive';
import type { LevelCode } from '../../core/models';

@Component({
  selector: 'app-level-overview',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, BidiTextDirective],
  templateUrl: './level-overview.component.html',
  styleUrl: './level-overview.component.scss',
})
export class LevelOverviewComponent {
  // Bound automatically from route param via withComponentInputBinding()
  readonly levelId = input<string>('');

  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly level = computed(() =>
    this.curriculumService.getLevelById(this.levelId())
  );

  protected readonly visibleCategories = computed(() =>
    this.curriculumService.getCategoriesWithContent(this.levelId())
  );

  protected getCategoryTopics(categoryId: string) {
    return this.curriculumService
      .getTopicsWithContent(this.levelId(), categoryId)
      .slice(0, 4);
  }

  protected readonly breadcrumbs = computed(() => [
    { label: 'Dashboard', route: '/dashboard' },
    { label: this.level()?.code ?? this.levelId() },
  ]);

  protected readonly totalTopics = computed(() =>
    this.curriculumService.getTotalTopicsForLevel(this.levelId())
  );

  protected readonly totalLessons = computed(() =>
    this.curriculumService.getTotalLessonsForLevel(this.levelId())
  );

  protected readonly levelColorClass = computed(() =>
    this.level()?.code.toLowerCase() ?? 'primary'
  );

  protected readonly levelCode = computed(() => this.level()?.code as LevelCode | undefined);
}
