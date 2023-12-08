import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './set/list/list.component';
import { FormComponent } from './set/form/form.component';
import { DetailComponent } from './set/detail/detail.component';

const routes: Routes = [
  { path:'', component: ListComponent},
  { path:'create', component: FormComponent},
  { path:'edit', component: FormComponent},
  { path:'detail', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
