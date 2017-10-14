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
@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    BasicsComponent,
    TeamComponent
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
