// app.routes.ts
import { Routes } from '@angular/router';

import { Registration } from './Registration/Registration';
import { Welcome } from './welcome/welcome';
import { LoginComponent } from './login/login';
import { Createprofile } from './createprofile/createprofile';
import { Userprofile } from './userprofile/userprofile';
import { Viewprofile } from './viewprofile/viewprofile';
import { Transfer } from './transfer/transfer';
import { DepositComponent } from './deposit/deposit';
import { WithdrawComponent } from './withdraw/withdraw';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: 'Registration', component: Registration },
  { path: '', component: Welcome },
  { path: 'login', component: LoginComponent },
  { path: 'customer-profile/:id', component: Createprofile },
  { path: 'app-userprofile/:id', component: Userprofile } ,
  { path: 'profile/:id', component: Userprofile } ,
  {path: 'profile/:id',component: Viewprofile},
  {path:'profile/transfer',component:Transfer},
  {
    path: 'withdraw/:id',
    component: WithdrawComponent
  },
    {path:'profile/deposit',component:DepositComponent},
  { path: 'dashboard', component: Dashboard },
];
