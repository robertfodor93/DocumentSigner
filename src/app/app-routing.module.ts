import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileSignerComponent } from './file-signer/file-signer.component';

const routes: Routes = [
  {path: ``, component: FileSignerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
