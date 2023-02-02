import { Component } from '@angular/core';
import { SignerService } from './_core/services/signer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DocumentSigner';

  files: File[] = [];

  constructor(private signerService: SignerService) { }
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSignFiles() {
    console.warn(this.files)
    this.signerService.create(this.files)
  }
}
