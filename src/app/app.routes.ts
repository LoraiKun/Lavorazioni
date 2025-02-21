import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './core/main/main.component';
import { LavorazioniComponent } from './pages/lavorazioni/lavorazioni.component';
import { RisorseComponent } from './pages/risorse/risorse.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: MainComponent,
    children: [
      { path: '', component: LavorazioniComponent },
      { path: 'risorse', component: RisorseComponent },
    ],
  },
];
