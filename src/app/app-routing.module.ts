import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent } from './products/pages/products-page/products-page.component';
import { LoggedInGuard } from './security/guards/logged-in.guard';
import { LoginPageComponent } from './security/pages/login-page/login-page.component';
import { SignupPageComponent } from './security/pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'products', component: ProductsPageComponent },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoggedInGuard],
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [LoggedInGuard],
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
