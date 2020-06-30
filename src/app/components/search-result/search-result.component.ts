import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'github-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() user: any;

  constructor() { }

  ngOnInit() {
  }

}
