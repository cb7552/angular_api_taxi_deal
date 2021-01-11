import { Directive, ElementRef, Input, OnChanges, Sanitizer, SecurityContext, SimpleChanges } from '@angular/core';

// Sets the element's innerHTML to a sanitized version of [safeHtml]
// tslint:disable-next-line:directive-selector
@Directive({ selector: '[safeHtml]' })
export class SafeHtmlDirective implements OnChanges {
    @Input() safeHtml: string;

    constructor(private elementRef: ElementRef, private sanitizer: Sanitizer) {}

    ngOnChanges(changes: SimpleChanges): any {
        if ('safeHtml' in changes) {
            this.elementRef.nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
        }
    }
}
