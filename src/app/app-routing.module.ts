import { WebsitesComponent } from './websites/websites.component';
import { WebsitesDetailComponent } from './websites-detail/websites-detail.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';
import { WebsiteAddComponent } from './website-add/website-add.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'websites',
    component: WebsitesComponent,
    data: { title: 'List of websites' }
  },
  {
    path: 'website-details/:id',
    component: WebsitesDetailComponent,
    data: { title: 'Website Details' }
  },
  {
    path: 'add-website',
    component: WebsiteAddComponent,
    data: { title: 'Add Website' }
  },
  {
    path: 'edit-website/:id',
    component: WebsiteEditComponent,
    data: { title: 'Edit website' }
  },
  { path: '',
    redirectTo: '/websites',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
