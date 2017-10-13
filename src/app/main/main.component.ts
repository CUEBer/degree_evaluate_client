import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

class Account {
  id: String;
  name: String;
  schollName: String;
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
  constructor(public authService: AuthService) {
  }
  ngOnInit() {
    this.authService.getResource<Account>('http://localhost:8080/account/' + this.userId).subscribe(
      data => { this.account = data; localStorage.setItem('discipline_id', this.account.disciplineId + ''); },
      err => { console.log(err); }
    );
  }
  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
