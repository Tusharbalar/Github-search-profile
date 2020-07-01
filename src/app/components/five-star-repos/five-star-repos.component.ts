import { Component, Input } from '@angular/core';

@Component({
  selector: 'github-five-star-repos',
  template: `
    <ul>
      <li *ngFor="let repo of repos">
        <a [href]="repo.clone_url" target="_blank">
          {{repo.name}}
        </a> 
        <span class="dots"></span> {{repo.stargazers_count}} starts
      </li>
    </ul>
  `,
  styleUrls: ['./five-star-repos.component.scss']
})
export class FiveStarReposComponent {

  @Input() repos: Array<any> = [];


}
