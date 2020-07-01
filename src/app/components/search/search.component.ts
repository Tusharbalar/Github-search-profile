import { Component } from '@angular/core';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private users: Array<any> = [];
  private repos: Array<any> = [];
  private selectedUser: any;

  setUserInfo(e: any) {
    if (e) {
      this.updateUsersInfo();
      this.selectedUser = e.userInfo || e.error;
      this.repos = e.topFiveRepos;
      console.log(this.repos)
    } else {
      this.resetAll();
    }
  }

  updateUsersInfo() {
    // Push to users array If user does not exist in the list
    if (this.selectedUser && this.selectedUser.id) {
      let result = this.users.find(obj => {
        return obj.userInfo.id == this.selectedUser.id;
      });
      if (!result) {
        this.users.unshift({ userInfo: this.selectedUser, topFiveRepos: this.repos });
      }
    }
  }

  resetAll() {
    this.users = [];
    this.selectedUser = null;
    this.repos = [];
  }
}
