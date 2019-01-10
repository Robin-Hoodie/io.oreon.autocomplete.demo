import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { User } from 'oreon-autocomplete';

// TODO: Check browser compatibility
// TODO: Go over instructions
// TODO: Add readme
// TODO: Deploy demo
@Component({
  selector: 'oreon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  commentCtrl: FormControl;
  comment: string;
  comments: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.commentCtrl = new FormControl();
    this.commentCtrl.valueChanges.subscribe(value => this.comment = value);
  }

  onEnter() {
    this.comments.push(this.commentCtrl.value);
    this.commentCtrl.setValue('');
  }
}
