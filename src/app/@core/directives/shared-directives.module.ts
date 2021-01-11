import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { NumberOnlyDirective } from './number-only.directive';
import { ValidDateDirective } from './valid-date.directive';
import { SafeHtmlDirective } from './safe-html.directive';

@NgModule({
    imports: [CommonModule, SharedPipesModule],
    declarations: [ValidDateDirective, NumberOnlyDirective, SafeHtmlDirective],
    exports: [ValidDateDirective, NumberOnlyDirective, SafeHtmlDirective]
})
export class SharedDirectivesModule {}
