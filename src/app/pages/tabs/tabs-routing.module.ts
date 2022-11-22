import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'rules',
        loadChildren: () => import('../rules/rules.module').then( m => m.RulesPageModule)
      },
      {
        path: 'checkin',
        loadChildren: () => import('../checkin/checkin.module').then( m => m.CheckinPageModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then( m => m.ActivitiesPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/rules',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
