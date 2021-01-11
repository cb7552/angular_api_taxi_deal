import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AuthGuard } from './@core/guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: './pages/pages.module#PagesModule',
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: ['All modules'],
  //     desc: ''
  //   }
  // },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Login'],
      desc: ''
    }
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Signup'],
      desc: ''
    }
  },
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Contacts'],
      desc: ''
    }
  },
  {
    path: 'terms-conditions',
    loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Terms'],
      desc: ''
    }
  },

  {
    path: 'tracking/:driverinfo/:timeinfo',
    loadChildren: './tracking-info/tracking-info.module#TrackingInfoModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Tracking'],
      desc: ''
    }
  },

  {
    path: 'search-home',
    loadChildren: './search-home/search-home.module#SearchHomeModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Search'],
      desc: ''
    },
  },
  {
    path: 'admin-list',
    loadChildren: './pages/admin-list/admin-list.module#AdminListModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'approval',
    loadChildren: './pages/approval/approval.module#ApprovalModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'driver-info',
    loadChildren: './pages/driver-info/driver-info.module#DriverInfoModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'offline',
    loadChildren: './pages/offline/offline.module#OfflineModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'online-offline',
    loadChildren: './pages/online-offline/online-offline.module#OnlineOfflineModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'trip-details',
    loadChildren: './pages/trip-details/trip-details.module#TripDetailsModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'vehicle-status',
    loadChildren: './pages/vehicle-status/vehicle-status.module#VehicleStatusModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'ride-calculation',
    loadChildren: './pages/ride-calculation/ride-calculation.module#RideCalculationModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'contact',
    loadChildren: './pages/contact/contact.module#ContactModule',
    canActivate: [AuthGuard],
    data: {
      title: ['All modules'],
      desc: ''
    }
  },
  {
    path: 'helps',
    loadChildren: './helps/helps.module#HelpsModule',
    // canActivate: [AuthGuard],
    data: {
      title: ['Helps'],
      desc: ''
    }
  },
  { path: 'error', loadChildren: './shared/pages/server-error/server-error.module#ServerErrorModule' },
  { path: 'access-denied', loadChildren: './shared/pages/access-denied/access-denied.module#AccessDeniedModule' },
  { path: 'not-found', loadChildren: './shared/pages/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
