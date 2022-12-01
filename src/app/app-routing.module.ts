import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SelectManagerComponent } from './select-manager/select-manager.component';
import { PlayerMenuComponent } from './player-menu/player-menu.component';
import { AddManagerFormComponent } from './add-manager-form/add-manager-form.component';
import { IsLoggedManagerGuard } from './guard/managerStep/is-logged-manager.guard';
import { IsLoggedGuard } from './guard/playerStep/is-logged.guard';

const routes: Routes = [
  //page Game
  {
    path: 'game',
    component: GamePageComponent,
    canActivate:[IsLoggedManagerGuard],
    loadChildren: () => import('./game/game.module').then((m) => m.GameModule),
  },

  //page Acceuil
  { path: '', redirectTo: '/home/connexion', pathMatch: 'full' },
  { path: 'home', redirectTo: '/home/connexion', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,

    children: [
      {
        path: 'connexion',
        component: LoginComponent,
      },
      { path: 'inscription', component: RegistrationComponent },
      { path: 'menu', component: PlayerMenuComponent, canActivate:[IsLoggedGuard] },
      { path: 'manager/select', component: SelectManagerComponent,canActivate:[IsLoggedGuard] },
      { path: 'manager/add', component: AddManagerFormComponent,canActivate:[IsLoggedGuard] },
    ],
  },
  //page Not found
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
