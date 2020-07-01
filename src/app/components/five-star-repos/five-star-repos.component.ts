import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'github-five-star-repos',
  templateUrl: './five-star-repos.component.html',
  styleUrls: ['./five-star-repos.component.scss']
})
export class FiveStarReposComponent implements OnInit {

  @Input() repos: Array<any> = [];
  
  constructor() { }

  ngOnInit() {
  }

}
