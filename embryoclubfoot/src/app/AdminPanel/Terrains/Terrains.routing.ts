import { Routes } from '@angular/router';
import { TerrainsComponent } from './Terrains/Terrains.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Role } from 'src/app/Models/role';
import { EditTerrainComponent } from './edit-terrain/edit-terrain.component';


export const TerrainsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'TerrainsComponent',
        // canActivate: [AuthGuard],
        // data: { roles: [Role.Client,Role.ClubAdmin,Role.SuperAdmin] },
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'terrains',
                component: TerrainsComponent
            },
            {
                path: 'terrains/:id',
                component: TerrainsComponent
            },
            {
                path: 'terrain-edit/:id',
                component: EditTerrainComponent
            },
        ]
    }
];