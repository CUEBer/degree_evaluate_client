import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { MainComponent } from './main/main.component';
import { BasicsComponent } from './basics/basics.component';
import { TeamComponent } from './team/team.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolComponent } from './school/school.component';
import { HeaderComponent } from './header/header.component';
import { SubjectComponent } from './subject/subject.component';
@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    BasicsComponent,
    TeamComponent,
    SchoolComponent,
    HeaderComponent,
    SubjectComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [LoginComponent]
})
export class AppModule { }
