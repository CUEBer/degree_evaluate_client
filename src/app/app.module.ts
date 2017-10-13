import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { MainComponent } from './main/main.component';
import { BasicsComponent } from './basics/basics.component';
import { TeamComponent } from './team/team.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HelloWorldComponent,
    UserItemComponent,
    UserListComponent,
    ArticleComponent,
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
