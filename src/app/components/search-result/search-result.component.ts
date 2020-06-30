import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'github-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() user: any;
  userCreationDate: any;

  constructor() { }

  ngOnInit() {
    console.log(this.user.created_at)
    this.userCreationDate = new Date(this.user.created_at).toLocaleDateString();
  }

}
