import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WebsitesComponent } from './websites/websites.component'
import { WebsitesDetailComponent } from './websites-detail/websites-detail.component'
import { WebsiteAddComponent } from './website-add/website-add.component'
import { WebsiteEditComponent } from './website-edit/website-edit.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteFeaturesRoutingModule {}
