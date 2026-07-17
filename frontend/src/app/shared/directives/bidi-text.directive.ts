import { Directive } from '@angular/core';

@Directive({
  selector: '[appBidiText]',
  standalone: true,
  host: {
    dir: 'auto',
    '[style.text-align]': "'start'",
    '[style.unicode-bidi]': "'plaintext'",
  },
})
export class BidiTextDirective {}
