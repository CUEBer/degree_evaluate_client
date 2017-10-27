import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
class Basics {
  id: Number;
  schoolId: Number;
  code: String;
  name: String;
  master: boolean;
  doctor: boolean;
  keyDiscipline: boolean;
  keyDate: Date;
  schoolName: String;
  constructor() {
  }
}
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  disciplineId: Number;
  basics: Basics;
  message:String;
  constructor(public authService: AuthService) {
  }
  key: boolean;

  ngOnInit() {
    this.basics = new Basics();
    this.authService.getResource<Basics>('http://localhost:8080/discipline/' + localStorage.getItem('discipline_id')).subscribe(
      data => { this.basics = data; console.log(data); },
      err => { console.log(err); }
    );

  }
  update(): boolean {
    console.log('to save: ' + JSON.stringify(this.basics));
    this.authService.postResource<Basics>('http://localhost:8080/discipline/basics',
      this.basics).subscribe(
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
