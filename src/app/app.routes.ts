import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './formulario/home.component'
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    { path: '', redirectTo: 'formulario', pathMatch: 'full' },
    { path: 'formulario', component: HomeComponent },
    { path: 'tabela', component: TableComponent },
];

  export class AppRoutesModule { }