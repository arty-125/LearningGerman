import { Component, inject, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { TopicCardComponent } from '../../shared/components/topic-card/topic-card.component';
import { BidiTextDirective } from '../../shared/directives/bidi-text.directive';
import type { LevelCode, CompletionStatus } from '../../core/models';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, BreadcrumbComponent, TopicCardComponent, BidiTextDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  readonly levelId = input<string>('');
  readonly categoryId = input<string>('');

  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly level = computed(() =>
    this.curriculumService.getLevelById(this.levelId())
  );

  protected readonly category = computed(() =>
    this.curriculumService.getCategoryById(this.levelId(), this.categoryId())
  );

  protected readonly visibleTopics = computed(() =>
    this.curriculumService.getTopicsWithContent(
      this.levelId(),
      this.categoryId()
    )
  );

  protected readonly breadcrumbs = computed(() => [
    { label: 'Dashboard', route: '/dashboard' },
    {
      label: this.level()?.code ?? this.levelId(),
      route: ['/levels', this.levelId()],
    },
    { label: this.category()?.title ?? this.categoryId() },
  ]);

  protected readonly levelCode = computed(
    () => (this.level()?.code ?? 'A1') as LevelCode
  );

  protected getTopicStatus(topicId: string): CompletionStatus {
    return this.progressService.getTopicStatus(topicId);
  }

  protected getCompletedLessons(lessons: { id: string }[]): number {
    const ids = lessons.map((l) => l.id);
    return this.progressService.getCompletedLessonCountForLevel(
      this.levelId(),
      ids
    );
  }
}
