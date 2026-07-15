import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurriculumService } from '../../core/services/curriculum.service';
import { ProgressService } from '../../core/services/progress.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { LevelBadgeComponent } from '../../shared/components/level-badge/level-badge.component';
import type { LevelCode } from '../../core/models';

interface LevelCard {
  id: string;
  code: LevelCode;
  title: string;
  description: string;
  color: string;
  lightColor: string;
  totalTopics: number;
  totalLessons: number;
  progressPercent: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent, LevelBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected readonly curriculumService = inject(CurriculumService);
  protected readonly progressService = inject(ProgressService);

  protected readonly levelCards = computed<LevelCard[]>(() =>
    this.curriculumService.levels().map((level) => ({
      id: level.id,
      code: level.code,
      title: level.title,
      description: level.description,
      color: level.color,
      lightColor: level.lightColor,
      totalTopics: this.curriculumService.getTotalTopicsForLevel(level.id),
      totalLessons: this.curriculumService.getTotalLessonsForLevel(level.id),
      progressPercent: 0, // will grow as lessons are completed in Phase 2+
    }))
  );

  protected readonly totalXp = this.progressService.totalXp;
  protected readonly streakDays = this.progressService.streakDays;
  protected readonly currentLevelId = this.progressService.currentLevelId;
}
