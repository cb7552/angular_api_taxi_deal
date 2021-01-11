import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './location.component';


import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCt8qHib4SVVI95ktSfF4tnhjYkpAPmlRA'
    })
  ],
  providers: [],
  declarations: [ LocationComponent ],
  bootstrap: [ LocationComponent ]
})
export class LocationModule {}