import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertComponent } from './components/convert/convert.component';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { NavberComponent } from './components/navber/navber.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QrgenComponent } from './components/qrgen/qrgen.component';
import { QrscanComponent } from './components/qrscan/qrscan.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navber', component: NavberComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'card', component: CardComponent, canActivate: [AuthGuard] },
  { path: 'qrgen', component: QrgenComponent, canActivate: [AuthGuard] },
  { path: 'qrscan', component: QrscanComponent, canActivate: [AuthGuard] },
  { path: 'convert', component: ConvertComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
