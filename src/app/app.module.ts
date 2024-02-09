import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuard } from './services/authGuard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes = [
  {
    path: 'produit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
    {
      path: '**', component: LoginComponent
    }

];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    RouterOutlet,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule
  ],
   providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
