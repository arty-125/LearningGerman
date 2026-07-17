import { Component, computed, input } from '@angular/core';
import { BidiTextDirective } from '../../directives/bidi-text.directive';

type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

interface LanguageSection {
  id: 'en' | 'fa' | 'plain';
  label: string;
  rtl: boolean;
  blocks: ContentBlock[];
}

@Component({
  selector: 'app-readable-content',
  standalone: true,
  imports: [BidiTextDirective],
  templateUrl: './readable-content.component.html',
  styleUrl: './readable-content.component.scss',
})
export class ReadableContentComponent {
  readonly text = input<string>('');
  readonly compact = input<boolean>(false);

  protected readonly sections = computed(() => this.buildSections(this.text()));

  protected readonly showLabels = computed(
    () => !this.compact() && this.sections().length > 1
  );

  private buildSections(raw: string): LanguageSection[] {
    const normalized = (raw ?? '').replace(/\r\n/g, '\n').trim();
    if (!normalized) return [];

    const tagged = this.parseTaggedBilingual(normalized);
    if (tagged) return tagged;

    const slashBased = this.parseSlashBilingual(normalized);
    if (slashBased) return slashBased;

    return [this.toSection('plain', normalized)];
  }

  private parseTaggedBilingual(text: string): LanguageSection[] | null {
    const lines = text.split('\n');
    const en: string[] = [];
    const fa: string[] = [];
    const plain: string[] = [];

    let current: 'en' | 'fa' | 'plain' = 'plain';

    for (const line of lines) {
      const enMatch = line.match(/^English:\s*(.*)$/i);
      if (enMatch) {
        current = 'en';
        en.push(enMatch[1]);
        continue;
      }

      const faMatch = line.match(/^فارسی:\s*(.*)$/);
      if (faMatch) {
        current = 'fa';
        fa.push(faMatch[1]);
        continue;
      }

      if (current === 'en') en.push(line);
      else if (current === 'fa') fa.push(line);
      else plain.push(line);
    }

    if (!en.length && !fa.length) return null;

    const sections: LanguageSection[] = [];
    if (en.join('').trim()) sections.push(this.toSection('en', en.join('\n').trim()));
    if (fa.join('').trim()) sections.push(this.toSection('fa', fa.join('\n').trim()));
    if (plain.join('').trim()) sections.push(this.toSection('plain', plain.join('\n').trim()));
    return sections;
  }

  private parseSlashBilingual(text: string): LanguageSection[] | null {
    const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
    if (!lines.length) return null;

    const parts = lines.map((line) => line.match(/^(.*?)\s\/\s(.*)$/));
    if (!parts.every(Boolean)) return null;

    const hasPersianOnRight = parts.some((match) => /[\u0600-\u06FF]/.test(match?.[2] ?? ''));
    if (!hasPersianOnRight) return null;

    const enText = parts.map((match) => (match?.[1] ?? '').trim()).join('\n').trim();
    const faText = parts.map((match) => (match?.[2] ?? '').trim()).join('\n').trim();
    if (!enText || !faText) return null;

    return [this.toSection('en', enText), this.toSection('fa', faText)];
  }

  private toSection(id: LanguageSection['id'], text: string): LanguageSection {
    return {
      id,
      label: id === 'en' ? 'English' : id === 'fa' ? 'فارسی' : 'Content',
      rtl: id === 'fa',
      blocks: this.parseBlocks(text),
    };
  }

  private parseBlocks(text: string): ContentBlock[] {
    const chunks = text.split(/\n\s*\n/).map((chunk) => chunk.trim()).filter(Boolean);

    return chunks.map((chunk) => {
      const lines = chunk.split('\n').map((line) => line.trim()).filter(Boolean);
      const listItems = lines
        .filter((line) => /^[-*]\s+/.test(line))
        .map((line) => line.replace(/^[-*]\s+/, '').trim());

      if (listItems.length === lines.length && listItems.length > 0) {
        return { type: 'list', items: listItems };
      }

      return { type: 'paragraph', text: chunk };
    });
  }
}
