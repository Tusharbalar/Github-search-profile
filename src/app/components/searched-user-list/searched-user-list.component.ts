import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'github-searched-user-list',
  templateUrl: './searched-user-list.component.html',
  styleUrls: ['./searched-user-list.component.scss']
})
export class SearchedUserListComponent {

  @Input() users: Array<any> = [];
  @Output() userSelected = new EventEmitter<any>();

  selectUser(user: any) {
    this.userSelected.emit({ userInfo: user.userInfo, topFiveRepos: user.topFiveRepos });
  }

}
