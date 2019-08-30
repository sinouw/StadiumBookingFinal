import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';

import { MainComponent } from './Main/Main.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { ResCalendarComponent } from './Pages/calendar/res-calendar/res-calendar.component';
import { UnauthorizedComponent } from './Pages/NotFound/unauthorized/unauthorized.component';

export const AppRoutes : Routes = [
   {
      path : '',
      redirectTo: 'home',
      pathMatch: 'full',
   },
   {
      path : '',
      component : MainComponent,
      children: [ 
         {
            path : 'home',
            component : HomeoneComponent
         },
         {
            path : 'home-two',
            component : HomeTwoComponent
         },
         {
            path : 'home-three',
            component : HomeThreeComponent
         },
         {
            path: 'cart',
            component: CartComponent
         },
         { path : 'calendar',
            component : ResCalendarComponent},
         {
            path: 'client',loadChildren: ()=>
            import('./Pages/Clubs/Clubs.module').then (m => m.ClubsModule)
         },
         {
            path: 'client',loadChildren: ()=>
            import('./Pages/terrains/terrains.module').then (m => m.TerrainsModule)
         },
         {
            path: 'products',loadChildren: ()=>
            import('./Pages/Products/Products.module').then (m => m.ProductsModule)
         },
         {
            path: 'session',loadChildren: ()=>
            import('./Pages/Session/Session.module').then (m => m.SessionModule)
         },
         {
          path: 'not-found',
          component: NotFoundComponent
         },
         {
            path: 'unauthorized',
            component: UnauthorizedComponent
           },
         {
            path: 'checkout',loadChildren: ()=>
            import('./Pages/Checkout/Checkout.module').then (m => m.CheckoutModule)
         },
         {
            path: '',loadChildren: ()=>
            import('./Pages/About/About.module').then( m=> m.AboutModule)
         },
         {
            path: 'blogs',loadChildren: ()=>
            import('./Pages/Blogs/Blogs.module').then (m => m.BlogsModule)
         },
         {
            path: 'account',loadChildren: ()=>
            import('./Pages/UserAccount/UserAccount.module').then (m => m.UserAccountModule)
         }
      ]
   },
   {
      path: '**',
      redirectTo: 'not-found'
   }
]
