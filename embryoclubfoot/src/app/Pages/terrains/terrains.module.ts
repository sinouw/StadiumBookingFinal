import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerrainsComponent } from './terrains/terrains.component';
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
import { RouterModule } from '@angular/router';
import { TerrainsRoutes } from './terrains.routing';
import { TerrainDetailComponent } from './terrain-detail/terrain-detail.component';
import { GlobalModule } from 'src/app/Global/Global.module';


@NgModule({
  declarations: [TerrainsComponent, TerrainDetailComponent],
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

    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    GlobalModule,
  ]
})
export class TerrainsModule { }
