import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard | LernDeutsch',
      },
      {
        path: 'levels/:levelId',
        loadComponent: () =>
          import('./features/level-overview/level-overview.component').then(
            (m) => m.LevelOverviewComponent
          ),
        title: 'Level Overview | LernDeutsch',
      },
      {
        path: 'levels/:levelId/categories/:categoryId',
        loadComponent: () =>
          import('./features/category/category.component').then(
            (m) => m.CategoryComponent
          ),
        title: 'Category | LernDeutsch',
      },
      {
        path: 'levels/:levelId/categories/:categoryId/topics/:topicId',
        loadComponent: () =>
          import('./features/topic/topic.component').then(
            (m) => m.TopicComponent
          ),
        title: 'Topic | LernDeutsch',
      },
      {
        path: 'lessons/:lessonId',
        loadComponent: () =>
          import('./features/lesson/lesson.component').then(
            (m) => m.LessonComponent
          ),
        title: 'Lesson | LernDeutsch',
      },
      {
        path: 'progress',
        loadComponent: () =>
          import('./features/progress/progress.component').then(
            (m) => m.ProgressComponent
          ),
        title: 'My Progress | LernDeutsch',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page Not Found | LernDeutsch',
  },
];
