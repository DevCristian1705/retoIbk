import { Routes } from '@angular/router'; 
import { Reto } from './reto/reto';
import { Home } from './home/home';
 

export const routes: Routes = [
    { path: '', component: Home }, 
    { path: 'reto', component: Reto },
    { path: '**', redirectTo: '' },
];
 
 