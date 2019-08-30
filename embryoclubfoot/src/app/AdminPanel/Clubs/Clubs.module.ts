import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './Clubs/Clubs.component';
import { AdminGenericService } from '../Service/AdminGeneric.service';
import { RouterModule } from '@angular/router';
import { ClubsRoutes } from './Clubs.routing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSidenavModule,
		 	MatIconModule,	
		 	MatButtonModule,
		 	MatCardModule,
		 	MatMenuModule,
		 	MatFormFieldModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule, 
         MatTableModule,
         MatListModule, 
         MatDividerModule,
         MatPaginatorModule,
         MatSortModule,         
			MatCheckboxModule,
         MatGridListModule,
         MatDatepickerModule
		 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule} from '../../Global/Global.module';
import { EditClubComponent } from './EditClub/EditClub.component';

@NgModule({
  declarations: [ClubsComponent, EditClubComponent],
  imports: [
    CommonModule,

    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    RouterModule.forChild(ClubsRoutes),
    MatDatepickerModule,

    TranslateModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    GlobalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AdminGenericService
  ]
})
export class ClubsModule { }
