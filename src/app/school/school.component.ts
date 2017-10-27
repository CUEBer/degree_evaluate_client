import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

class School {
  id: Number;
  name: String;
  constructor() {
  }
}


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  school: School;
  message:String;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authService.getResource<School>('http://localhost:8080/school/query/1').subscribe(
      data => {
        this.school = data;
      },
      err => {
        console.log(err);
        if (err.status === 401) {
          // invalide token or not logged in
          this.authService.logout();
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  save(): boolean {
    //alert(JSON.stringify(this.school));
    console.log('to save: ' + JSON.stringify(this.school));
    this.authService.postResource<School>('http://localhost:8080/school/save',
      this.school).subscribe(
      data => {
        this.message=data.toString();
        },
      err => {
        this.message=err.toString();
      }
    );
    return false;
  }

}
