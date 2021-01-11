import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { ValidDateFormatPipe } from '../pipes/custom-date.pipe';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[validdate]' })
export class ValidDateDirective implements OnInit {
    private el: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private datePipe: ValidDateFormatPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.datePipe.transform(this.el.value);
    }

    @HostListener('focus', ['$event.target.value'])
    onFocus(value) {
        this.el.value = this.el.value;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value) {
        this.el.value = this.datePipe.transform(this.el.value);
    }
}
