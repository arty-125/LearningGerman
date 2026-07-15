import { Component, inject, computed, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { LevelBadgeComponent } from '../../shared/components/level-badge/level-badge.component';
import type { LevelCode } from '../../core/models';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, LevelBadgeComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent implements OnInit {
  readonly lessonId = input<string>('');

  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly lesson = computed(() =>
    this.curriculumService.getLessonById(this.lessonId())
  );

  protected readonly levelCode = computed(() => {
    const l = this.lesson();
    const level = l
      ? this.curriculumService.getLevelById(l.levelId)
      : undefined;
    return (level?.code ?? 'A1') as LevelCode;
  });

  protected readonly breadcrumbs = computed(() => {
    const l = this.lesson();
    if (!l) return [{ label: 'Dashboard', route: '/dashboard' }];
    const level = this.curriculumService.getLevelById(l.levelId);
    const cat = this.curriculumService.getCategoryById(
      l.levelId,
      l.categoryId
    );
    return [
      { label: 'Dashboard', route: '/dashboard' },
      { label: level?.code ?? l.levelId, route: ['/levels', l.levelId] },
      {
        label: cat?.title ?? l.categoryId,
        route: ['/levels', l.levelId, 'categories', l.categoryId],
      },
      { label: l.title },
    ];
  });

  ngOnInit(): void {
    const id = this.lessonId();
    if (id) {
      this.progressService.markLessonInProgress(id);
    }
  }

  protected markComplete(): void {
    const id = this.lessonId();
    if (id) {
      this.progressService.markLessonComplete(id, 100);
    }
  }
}
