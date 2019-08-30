import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSelectModule,
			MatInputModule, 
			MatFormFieldModule,
			MatIconModule,
			MatCardModule,
			MatButtonModule,
			MatProgressSpinnerModule,
			MatCheckboxModule,
			MatMenuModule,
			MatDialogModule,
			MatDatepickerModule,
			MatTableModule
		 } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';;
import { FlexLayoutModule } from '@angular/flex-layout';

import { TitleComponent } from './TitleComponent/TitleComponent.component';
import { TopsideMenuComponent } from './Menu/TopsideMenu/TopsideMenu.component';
import { DeleteListDialogComponent } from './PopUp/DeleteListDialog/DeleteListDialog.component';
import { BuySellChartComponent } from './Charts/BuySellChart/BuySellChart.component';
import { SeeListDialogComponent } from './PopUp/SeeListDialog/SeeListDialog.component';
import { AddNewUserComponent } from './PopUp/AddNewUser/AddNewUser.component';
import { HeaderUserProfileDropdownComponent } from './HeaderUserProfileDropdown/HeaderUserProfileDropdown.component';
import { RouterModule } from '@angular/router';
import { AddClubComponent } from './PopUp/AddClub/AddClub.component';

import { AddReservationComponent } from './PopUp/add-reservation/add-reservation.component';

import { AddNewTerrainComponent } from './PopUp/AddNewTerrain/AddNewTerrain.component';
import { EditReservationComponent } from './PopUp/edit-reservation/edit-reservation.component';
import { AddReservationClientComponent } from './PopUp/add-reservation-client/add-reservation-client.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


@NgModule({
	declarations: [
		TitleComponent,
		TopsideMenuComponent,
		DeleteListDialogComponent,
		BuySellChartComponent,
		SeeListDialogComponent,
		AddNewUserComponent,
		HeaderUserProfileDropdownComponent,
		AddClubComponent,

		AddReservationComponent,
		AddNewTerrainComponent,
		EditReservationComponent,
		AddReservationClientComponent

	],
	imports: [
		CommonModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ChartsModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		PerfectScrollbarModule,
		TranslateModule,
		MatCheckboxModule,
		MatMenuModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatTableModule,  
		FlexLayoutModule,
		RouterModule
	],
	exports : [
		TitleComponent,
		TopsideMenuComponent,
		BuySellChartComponent,
		HeaderUserProfileDropdownComponent
	],
	entryComponents: [
      DeleteListDialogComponent,
      SeeListDialogComponent,
	  AddNewUserComponent,
	  AddReservationClientComponent,
	  EditReservationComponent,
	  AddClubComponent,
	  AddReservationComponent,
	  AddNewTerrainComponent

   ],
   providers: [
	   DatePipe
   ]
})
export class WidgetModule { }
