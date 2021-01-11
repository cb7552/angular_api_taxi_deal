import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, RoleGuard, PreventUnsavedChangesGuard, SeoGuard, SeoPageIdGuard } from './guard';

const GUARDS = [
  AuthGuard,
  RoleGuard,
  PreventUnsavedChangesGuard,
  SeoGuard,
  SeoPageIdGuard
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...GUARDS,
  ],
})
export class GuardModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: GuardModule,
      providers: [
        ...GUARDS,
      ],
    };
  }
}
