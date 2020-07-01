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
    if (this.selectedUser && this.selectedUser.id) {
      let result = this.users.find(obj => {
        return obj.id == this.selectedUser.id;
      });
      if (!result) {
        this.users.unshift(this.selectedUser);
      }
    }
    
    if (e == null) { // Reset user list data
      this.users = [];
    }
    this.selectedUser = e && (e.userInfo || e.error);
    this.repos = e.topFiveRepos;
  }

}
