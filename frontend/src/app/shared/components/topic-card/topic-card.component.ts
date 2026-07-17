import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LevelBadgeComponent } from '../level-badge/level-badge.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { BidiTextDirective } from '../../directives/bidi-text.directive';
import type { LevelCode, CompletionStatus } from '../../../core/models';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [RouterLink, LevelBadgeComponent, ProgressBarComponent, BidiTextDirective],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss',
})
export class TopicCardComponent {
  readonly topicId = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly levelId = input.required<string>();
  readonly categoryId = input.required<string>();
  readonly levelCode = input.required<LevelCode>();
  readonly difficulty = input<number>(1);
  readonly estimatedMinutes = input<number>(0);
  readonly status = input<CompletionStatus>('not-started');
  readonly lessonCount = input<number>(0);
  readonly completedLessons = input<number>(0);

  readonly topicClicked = output<string>();

  protected get progressPercent(): number {
    const total = this.lessonCount();
    if (total === 0) return 0;
    return Math.round((this.completedLessons() / total) * 100);
  }

  protected get statusLabel(): string {
    switch (this.status()) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      default: return 'Not Started';
    }
  }

  protected get difficultyStars(): string {
    return '★'.repeat(this.difficulty()) + '☆'.repeat(5 - this.difficulty());
  }
}
