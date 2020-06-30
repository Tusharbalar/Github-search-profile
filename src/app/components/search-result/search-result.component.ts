import { Component, OnInit, Input } from '@angular/core';
import * as CONST from "../../constants";

@Component({
  selector: 'github-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() user: any;
  userCreationDate: any;
  isUserFound: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log(this.user.created_at)
    this.userCreationDate = new Date(this.user.created_at).toLocaleDateString();
    this.checkIfUserFoundOrNot();
  }

  checkIfUserFoundOrNot() {
    if (this.user == CONST.USER_NOT_FOUND) {
      this.isUserFound = false;
    }
  }

}
