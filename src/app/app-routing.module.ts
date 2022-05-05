import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';








const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule)  },
  {path:'nav',loadChildren:()=> import('./navbar/nav.module').then(m=>m.NavModule)},
  
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload', 
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
