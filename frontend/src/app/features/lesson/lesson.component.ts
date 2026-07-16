import { Component, inject, computed, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { LevelBadgeComponent } from '../../shared/components/level-badge/level-badge.component';
import { ReadableContentComponent } from '../../shared/components/readable-content/readable-content.component';
import type { LevelCode } from '../../core/models';
import type { VocabularyItem } from '../../core/models/lesson.model';

interface VocabularyViewModel {
  german: string;
  english: string;
  persian: string;
  article?: string;
  plural?: string;
  exampleDe: string;
  exampleFa: string;
}

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    LevelBadgeComponent,
    ReadableContentComponent,
  ],
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

  protected readonly vocabularyRows = computed<VocabularyViewModel[]>(() => {
    const vocabulary = this.lesson()?.vocabulary ?? [];
    return vocabulary.map((item) => this.toVocabularyViewModel(item));
  });

  private toVocabularyViewModel(item: VocabularyItem): VocabularyViewModel {
    const rawExample = item.example?.trim() ?? '';
    const inlinePersian = this.extractInlinePersian(rawExample);

    return {
      german: item.german,
      english: item.english,
      persian: item.persian?.trim() || '—',
      article: item.article,
      plural: item.plural,
      exampleDe: this.stripInlineTranslation(rawExample) || rawExample || '—',
      exampleFa: item.examplePersian?.trim() || inlinePersian || 'ترجمه فارسی این مثال در حال تکمیل است.',
    };
  }

  private stripInlineTranslation(example: string): string {
    return example.replace(/\s*\([^()]*\)\s*$/, '').trim();
  }

  private extractInlinePersian(example: string): string {
    const match = example.match(/\(([^()]*)\)\s*$/);
    const candidate = match?.[1]?.trim() ?? '';
    // Only reuse legacy inline text if it is actually Persian script.
    return /[\u0600-\u06FF]/.test(candidate) ? candidate : '';
  }

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
