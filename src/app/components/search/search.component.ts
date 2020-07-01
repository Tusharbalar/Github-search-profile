import { Component, OnInit, OnDestroy } from '@angular/core';
import { isNull } from 'util';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  users: Array<any> = [];
  repos: Array<any> = [];
  selectedUser: any;

  constructor() {

  }

  ngOnInit() {

  }

  setUserInfo(e: any) {

    if (e) {
      // Push to users array If user does not exist in the list
      if (this.selectedUser && this.selectedUser.id) {
        let result = this.users.find(obj => {
          return obj.userInfo.id == this.selectedUser.id;
        });
        if (!result) {
          this.users.unshift({ userInfo: this.selectedUser, topFiveRepos: this.repos });
        }
      }

      this.selectedUser = e.userInfo || e.error;
      this.repos = e.topFiveRepos;
    } else {
      this.resetAll();
    }
  }

  resetAll() {
    this.users = [];
    this.selectedUser = null;
    this.repos = [];
  }
}
