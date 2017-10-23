import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../auth.service";

class Team {
  id: Number;
  duty: String;
  totalnumber: String ;
  under35 : String ;
  between36to45 : String ;
  between46to55 : String ;
  between56to60 : String ;
  above61 : String ;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team: Team;
  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.authService.getResource<Team>('http://localhost:8080/structure/query/'+ localStorage.getItem('discipline_id')).subscribe(
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
