import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';
import { MainAdminPanelComponent } from './Main/Main.component';
import { AuthGuard } from '../guards/auth.guard';
import { Role } from '../Models/role';

export const AdminPanelRoutes : Routes = [
   {
      path : 'admin-panel',

      redirectTo: 'admin-panel/account/profile',
      pathMatch: 'full',
   }, 
   {
      path : "admin-panel",
      component : MainAdminPanelComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.SuperAdmin, Role.ClubAdmin] },
      children: [ 
         // {
         //    path: 'reports',loadChildren: ()=>
         //    import('./Reports/Reports.module').then (m => m.ReportsModule)
         // },
         {
            path: 'invoices',loadChildren: ()=>
            import('./Invoices/Invoices.module').then (m => m.InvoicesModule)
         },
         {
            path: '',loadChildren: ()=>
            import('./Products/Products.module').then(m => m.ProductsModule)
         },
         {
            path: '',loadChildren: ()=>
            import('./Clubs/Clubs.module').then(m => m.ClubsModule)
         },
         {
            path: '',loadChildren: ()=>
            import('./Terrains/Terrains.module').then(m => m.TerrainsModule)
         },
         {
            path: 'account',loadChildren: ()=>
            import('./AdminAccount/AdminAccount.module').then (m => m.AdminAccountModule)
         }
      ]
   }
]