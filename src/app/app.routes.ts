import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import {
  AppLandingLayoutComponent,
  AppDoubleNavLayoutComponent
} from './_system/_layouts';

import { AuthGuard } from './_system/services/auth.guard';
import { TcodeGuard } from './_system/services/tcode.guard';

/**
 * @const Routes
 * Lazy loading routes are secured by levels and sorted by alphabet order
 */
export const routes: Routes = [

  // Public Area - No security restriction
  {
    path: '',
    component: AppLandingLayoutComponent,
    data: { title: 'public' },
    children: [
      { path: '', redirectTo: 'landing',  pathMatch: 'full' },
      { path: 'landing', loadChildren: './_public/landing/landing.module#LandingModule' },
      { path: 'posts', loadChildren: './_public/landing/pages/posts/posts.module#PostsModule' },

      { path: 'login', loadChildren: './_public/login/login.module#LoginModule' },
      { path: 'register', loadChildren: './_public/register/register.module#RegisterModule' },
      { path: 'forgot', loadChildren: './_public/forgot/forgot.module#ForgotModule' },
      { path: 'lockscreen', loadChildren: './_public/lockscreen/lockscreen.module#LockscreenModule' },
      { path: 'lock', loadChildren: './_public/lockscreen/lockscreen.module#LockscreenModule' },

      { path: '401', loadChildren: './_public/401/401.module#P401Module' },
      { path: '403', loadChildren: './_public/403/403.module#P403Module' },
      { path: '404', loadChildren: './_public/404/404.module#P404Module' },
      { path: '500', loadChildren: './_public/500/500.module#P500Module' },
    ]
  },

  // Private Area - Secured
  {
    path: '',
    component: AppDoubleNavLayoutComponent,
    canActivateChild: [AuthGuard],
    data: { title: 'private' },
    children: [
      { path: '', redirectTo: 'home',  pathMatch: 'full' },

      { path: 'blank', loadChildren: './_private/_blank/blank.module#BlankModule' },

      { path: 'home', loadChildren: './_private/home/home.module#HomeModule' },
      { path: 'main', loadChildren: './_private/main/main.module#MainModule' },

      { path: 'about', loadChildren: './_private/about/about.module#AboutModule' },
      { path: 'profile', loadChildren: './_private/profile/profile.module#ProfileModule' },
      { path: 'policy', loadChildren: './_private/policy/policy.module#PolicyModule' },
      { path: 'maintenance', loadChildren: './_private/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'fav', loadChildren: './_private/fav/fav.module#FavModule' },
      { path: 'theme', loadChildren: './_private/themes/themes.module#ThemesModule' },
      { path: 'themes', loadChildren: './_private/themes/themes.module#ThemesModule' },
      { path: 'setting', loadChildren: './_private/setting/setting.module#SettingModule' },

      { path: 'tray', loadChildren: './_private/tray/tray.module#TrayModule' },
      { path: 'inbox', loadChildren: './_private/inbox/inbox.module#InboxModule' },
      { path: 'outbox', loadChildren: './_private/outbox/outbox.module#OutboxModule' },
      { path: 'draft', loadChildren: './_private/draft/draft.module#DraftModule' },
      { path: 'inprogress', loadChildren: './_private/inProgress/inProgress.module#InProgressModule' },
      { path: 'completed', loadChildren: './_private/completed/completed.module#CompletedModule' },

      { path: 'ibx', loadChildren: './_private/inbox/inbox.module#InboxModule' },
      { path: 'obx', loadChildren: './_private/outbox/outbox.module#OutboxModule' },
      { path: 'drf', loadChildren: './_private/draft/draft.module#DraftModule' },
      { path: 'progress', loadChildren: './_private/inProgress/inProgress.module#InProgressModule' },
      { path: 'ipg', loadChildren: './_private/inProgress/inProgress.module#InProgressModule' },
      { path: 'clt', loadChildren: './_private/completed/completed.module#CompletedModule' },

      { path: 'incident', loadChildren: './_private/incident/incident.module#IncidentModule' },
      { path: 'icd', loadChildren: './_private/incident/incident.module#IncidentModule' },
      { path: 'change', loadChildren: './_private/change/change.module#ChangeModule' },
    ]
  },

  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
