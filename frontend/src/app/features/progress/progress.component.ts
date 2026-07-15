import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { LevelBadgeComponent } from '../../shared/components/level-badge/level-badge.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import type { LevelCode } from '../../core/models';

interface LevelStats {
  id: string;
  code: LevelCode;
  title: string;
  color: string;
  topicsTotal: number;
  lessonsTotal: number;
  lessonsCompleted: number;
  progressPercent: number;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterLink, LevelBadgeComponent, ProgressBarComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly levelStats = computed<LevelStats[]>(() =>
    this.curriculumService.levels().map((level) => {
      const totalLessons = this.curriculumService.getTotalLessonsForLevel(
        level.id
      );
      // Gather all lesson IDs for the level
      const lessonIds: string[] = level.categories.flatMap((c) =>
        c.topics.flatMap((t) => t.lessons.map((l) => l.id))
      );
      const completed = this.progressService.getCompletedLessonCountForLevel(
        level.id,
        lessonIds
      );
      return {
        id: level.id,
        code: level.code,
        title: level.title,
        color: level.color,
        topicsTotal: this.curriculumService.getTotalTopicsForLevel(level.id),
        lessonsTotal: totalLessons,
        lessonsCompleted: completed,
        progressPercent:
          totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
      };
    })
  );

  protected readonly totalXp = this.progressService.totalXp;
  protected readonly streakDays = this.progressService.streakDays;

  protected readonly overallProgress = computed(() => {
    const stats = this.levelStats();
    const total = stats.reduce((s, l) => s + l.lessonsTotal, 0);
    const completed = stats.reduce((s, l) => s + l.lessonsCompleted, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  resetProgress(): void {
    if (confirm('Reset all your progress? This cannot be undone.')) {
      this.progressService.resetAllProgress();
    }
  }
}
