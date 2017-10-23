import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicsComponent } from './basics/basics.component';
import { TeamComponent } from './team/team.component';
import {SchoolComponent} from "./school/school.component";

const routes: Routes = [
    { path: 'basics', component: BasicsComponent },
    { path: 'team', component: TeamComponent },
  { path: 'school', component: SchoolComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
