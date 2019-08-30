import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerrainsComponent } from './Terrains/Terrains.component';
import { TerrainsRoutes } from './Terrains.routing';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/Global/Global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTerrainComponent } from './edit-terrain/edit-terrain.component';



@NgModule({
  declarations: [TerrainsComponent, EditTerrainComponent],
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
    RouterModule.forChild(TerrainsRoutes),

    MatDatepickerModule,

    TranslateModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    GlobalModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TerrainsModule { }
