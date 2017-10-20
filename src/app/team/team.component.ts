import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../auth.service";

class Team {
  id: Number;
  name: String;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() userId: String;
  team: Team;
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    if (this.userId == null){
      this.userId = localStorage.getItem('userId');
    }
    this.authService.getResource<Team>('http://localhost:8080/school/query').subscribe(
      data => {
        this.team = data;
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
