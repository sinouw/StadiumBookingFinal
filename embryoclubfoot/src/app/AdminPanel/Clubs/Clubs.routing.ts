import { Routes } from '@angular/router';
import { ClubsComponent } from './Clubs/Clubs.component';
import { EditClubComponent } from './EditClub/EditClub.component';
import { Role } from 'src/app/Models/role';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const ClubsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'ClubsComponent',
        // canActivate: [AuthGuard],
        // data: { roles: [Role.Client,Role.ClubAdmin,Role.SuperAdmin] },
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'clubs',
                component: ClubsComponent
            },
            {
                path: 'club-edit/:id',
                component: EditClubComponent
            },
        ]
    }
];
