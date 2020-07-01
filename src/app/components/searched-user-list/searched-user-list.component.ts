import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'github-searched-user-list',
  templateUrl: './searched-user-list.component.html',
  styleUrls: ['./searched-user-list.component.scss']
})
export class SearchedUserListComponent implements OnInit {

  @Input() users: Array<any> = [];
  @Output() userSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  selectUser(user) {
    this.userSelected.emit({ userInfo: user });
  }

}
