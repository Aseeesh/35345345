import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubrouteComponent } from './subroute/subroute.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BestDealsComponent } from './best-deals/best-deals.component';
import { SearchflightsComponent } from './searchflights/searchflights.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subroute', component: SubrouteComponent },
  { path: 'flight-results', component: FlightResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bestDeals', component: BestDealsComponent },

  { path: 'signUp', component: SignUpComponent },
  { path: 'search', component: SearchflightsComponent }
];
