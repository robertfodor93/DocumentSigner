import { Component } from '@angular/core';
import { Snapshot } from '../_core/models/snapshot';
import { SignerService } from '../_core/services/signer.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-signer-explorer',
  templateUrl: './file-signer-explorer.component.html',
  styleUrls: ['./file-signer-explorer.component.scss']
})
export class FileSignerExplorerComponent {

  files: File[] = [];
  postFiles: any[] = [];
  snapshot: Snapshot = {};
  signedFiles: any[] = [];

  private url = this.snapshot.snapshot?.stage.url

  constructor(private signerService: SignerService, private sanitizer: DomSanitizer) { }
  
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles) 
    if(this.files && this.files[0]) {
      for(let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i])
        .then(result => {
          const base64String = result.replace('data:', '')
          .replace(/^.+,/, '');
          this.postFiles.push({name: this.files[i].name, content: base64String});
        })
      }
    }
    this.signerService.explorerCreate({documents: this.postFiles}).subscribe(response => {
      this.snapshot = response
    })
    
  }

  fileToBase64 (file: File) : Promise<string> {
    return new Promise<string> ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result?.toString() as string);
      reader.onerror = error => reject(error)
    })
  }

  explorerUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.snapshot.snapshot?.stage.url as string)
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
