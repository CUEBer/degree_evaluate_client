import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

class Account {
  id: String;
  name: String;
  schoolName: String;
  disciplineName: String;
  disciplineId: Number;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() userId: String;
  account: Account;
  constructor(public authService: AuthService, public router: Router) {
  }
  ngOnInit() {
    if (this.userId == null){
      this.userId = localStorage.getItem('userId');
    }
    this.authService.getResource<Account>('http://localhost:8080/account/' + this.userId).subscribe(
      data => {
          this.account = data;
          localStorage.setItem('discipline_id', this.account.disciplineId + '');
          localStorage.setItem('userId', this.userId + '');
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
  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
