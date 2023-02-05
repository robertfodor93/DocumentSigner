import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileSignerExplorerComponent } from './file-signer-explorer/file-signer-explorer.component';
import { FileSignerComponent } from './file-signer/file-signer.component';

const routes: Routes = [
  {path: `explorer`, component: FileSignerExplorerComponent},
  {path: `signer`, component: FileSignerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
