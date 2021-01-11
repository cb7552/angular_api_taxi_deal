import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileServices } from './_services/_profile.component.services';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ControlMessagesModule } from 'src/app/shared';
import { createTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ControlMessagesModule,
    ImageCropperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ProfileServices]
})
export class ProfileModule { }
