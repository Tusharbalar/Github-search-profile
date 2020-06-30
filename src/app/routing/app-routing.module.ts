import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';
import { SearchResultComponent } from '../components/search-result/search-result.component';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "search" },
  {
    path: "search", component: SearchComponent,
    children: [
      // { path: '', redirectTo: 'result', pathMatch: 'full' },
      { path: 'result', component: SearchResultComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
