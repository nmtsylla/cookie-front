import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebsitesComponent } from './websites/websites.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { WebsitesDetailComponent } from './websites-detail/websites-detail.component';
import { WebsiteAddComponent } from './website-add/website-add.component';
import { WebsiteEditComponent } from './website-edit/website-edit.component';
import { WebsiteFeaturesRoutingModule } from './website-features-routing.module';




@NgModule({
  declarations: [
    WebsitesComponent,
    WebsitesDetailComponent,
    WebsiteAddComponent,
    WebsiteEditComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    WebsiteFeaturesRoutingModule,
    MatSelectModule,
  ]
})
export class WebsiteFeaturesModule { }
