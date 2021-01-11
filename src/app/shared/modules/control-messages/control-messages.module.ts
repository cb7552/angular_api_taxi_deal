import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ControlMessagesComponent],
    exports: [ControlMessagesComponent]
})
export class ControlMessagesModule {}
