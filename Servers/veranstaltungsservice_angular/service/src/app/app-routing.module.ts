import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VeranstaltungAnlegenComponent } from './veranstaltung-anlegen/veranstaltung-anlegen.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { VeranstaltungComponent } from './veranstaltung/veranstaltung.component';
import { ParticipatnComponent } from './participatn/participatn.component';

const routes: Routes = [
    { path: 'veranstaltung-anlegen', component: VeranstaltungAnlegenComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'veranstaltung', component: VeranstaltungComponent },
    { path: 'participatn', component: ParticipatnComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }