import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageCode, LanguageService } from '../../core/services/language.service';
import { BidiTextDirective } from '../../shared/directives/bidi-text.directive';

interface LanguageCard {
  code: LanguageCode;
  title: string;
  subtitle: string;
  accent: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BidiTextDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly router = inject(Router);
  protected readonly languageService = inject(LanguageService);

  protected readonly languages: LanguageCard[] = [
    {
      code: 'de',
      title: 'German',
      subtitle: 'Deutsch lernen',
      accent: 'var(--color-a2)',
      description: 'Structured lessons for German with grammar, vocabulary, and guided practice.',
    },
    {
      code: 'fr',
      title: 'French',
      subtitle: 'Apprendre le français',
      accent: '#f97316',
      description: 'A parallel French track with the same curriculum structure and lesson flow.',
    },
  ];

  chooseLanguage(language: LanguageCode): void {
    this.languageService.setLanguage(language);
    void this.router.navigate(['/dashboard']);
  }
}
