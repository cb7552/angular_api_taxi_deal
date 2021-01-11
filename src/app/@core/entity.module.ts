import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Entities */
import { AppUser } from './entities/authDataModel';

const ENTITIES = [
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...ENTITIES,
  ],
})
export class EntityModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: EntityModule,
      providers: [
        ...ENTITIES,
      ],
    };
  }
}

