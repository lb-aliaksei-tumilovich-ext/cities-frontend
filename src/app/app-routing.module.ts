import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CitiesComponent} from "./component/cities/cities.component";
import {CityEditorComponent} from "./component/city-editor/city-editor.component";

const routes: Routes = [
  {path: '', redirectTo: '/cities', pathMatch: 'full'},
  {path: 'cities/:id', component: CityEditorComponent},
  {path: 'cities', component: CitiesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
