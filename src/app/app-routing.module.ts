import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'websites' },
  {
    path: 'websites',
    loadChildren: () =>
      import('./website-features/website-features.module').then(
        mod => mod.WebsiteFeaturesModule
      )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
