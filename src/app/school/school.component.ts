import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

class School {
  id: Number;
  name: String;
}


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  school: School;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authService.getResource<School>('http://localhost:8080/school/query/'+ localStorage.getItem('discipline_id')).subscribe(
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

}
