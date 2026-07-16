import { Injectable, effect, signal } from '@angular/core';

export type LanguageCode = 'de' | 'fr';

const STORAGE_KEY = 'lg_language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _language = signal<LanguageCode>(this.loadInitialLanguage());

  readonly language = this._language.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, this._language());
    });
  }

  setLanguage(language: LanguageCode): void {
    this._language.set(language);
  }

  isLanguage(language: LanguageCode): boolean {
    return this._language() === language;
  }

  private loadInitialLanguage(): LanguageCode {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'de') return stored;
    return 'de';
  }
}
