import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';
import { FormsModule } from '@angular/forms';

import { GlobalModule } from '../../Global/Global.module';
import { TemplatesModule } from '../../Templates/Templates.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,

  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatExpansionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatChipsModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatSliderModule,
  MatRadioModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ClubsRoutes } from './Clubs.routing';
import { ClubSliderComponent } from './ClubSlider/ClubSlider.component';
import { ClubsComponent } from './Clubs/Clubs.component';



@NgModule({
  declarations: [
    ClubsComponent,
    ClubSliderComponent,
    // RatingComponent,
    // AddToCardButtonComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(ClubsRoutes),
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule,
    GlobalModule,
    TemplatesModule,
    NgAisModule,
    FormsModule,

    SlickCarouselModule
  ]
})
export class ClubsModule { }
