import { Component, inject, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { LevelBadgeComponent } from '../../shared/components/level-badge/level-badge.component';
import { BidiTextDirective } from '../../shared/directives/bidi-text.directive';
import type { LevelCode, CompletionStatus } from '../../core/models';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, LevelBadgeComponent, BidiTextDirective],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss',
})
export class TopicComponent {
  readonly levelId = input<string>('');
  readonly categoryId = input<string>('');
  readonly topicId = input<string>('');

  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly topic = computed(() =>
    this.curriculumService.getTopicById(
      this.levelId(),
      this.categoryId(),
      this.topicId()
    )
  );

  protected readonly level = computed(() =>
    this.curriculumService.getLevelById(this.levelId())
  );

  protected readonly category = computed(() =>
    this.curriculumService.getCategoryById(this.levelId(), this.categoryId())
  );

  protected readonly levelCode = computed(
    () => (this.level()?.code ?? 'A1') as LevelCode
  );

  protected readonly breadcrumbs = computed(() => [
    { label: 'Dashboard', route: '/dashboard' },
    {
      label: this.level()?.code ?? this.levelId(),
      route: ['/levels', this.levelId()],
    },
    {
      label: this.category()?.title ?? this.categoryId(),
      route: ['/levels', this.levelId(), 'categories', this.categoryId()],
    },
    { label: this.topic()?.title ?? this.topicId() },
  ]);

  protected getLessonStatus(lessonId: string): CompletionStatus {
    return this.progressService.getLessonStatus(lessonId);
  }

  protected statusLabel(status: CompletionStatus): string {
    if (status === 'completed') return 'Completed';
    if (status === 'in-progress') return 'In Progress';
    return 'Not Started';
  }

  protected statusIcon(status: CompletionStatus): string {
    if (status === 'completed') return '✓';
    if (status === 'in-progress') return '▶';
    return '○';
  }
}
