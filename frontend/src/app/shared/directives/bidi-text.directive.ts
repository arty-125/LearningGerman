import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
  selector: '[appBidiText]',
  standalone: true,
})
export class BidiTextDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private hasPersianScript(): boolean {
    const text = this.elementRef.nativeElement.textContent ?? '';
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
  }

  @HostBinding('attr.dir')
  get dir(): 'rtl' | 'auto' {
    // Force RTL whenever Persian/Arabic script appears in mixed text.
    return this.hasPersianScript() ? 'rtl' : 'auto';
  }

  @HostBinding('style.text-align')
  readonly textAlign = 'start';

  @HostBinding('style.unicode-bidi')
  get unicodeBidi(): 'isolate' | 'plaintext' {
    // plaintext can re-derive direction from leading Latin/number tokens.
    // For Persian-mixed strings, isolate + dir=rtl keeps heading flow correct.
    return this.hasPersianScript() ? 'isolate' : 'plaintext';
  }
}
