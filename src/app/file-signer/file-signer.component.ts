import { Component } from '@angular/core';
import { SignerService } from '../_core/services/signer.service';

@Component({
  selector: 'app-file-signer',
  templateUrl: './file-signer.component.html',
  styleUrls: ['./file-signer.component.scss']
})
export class FileSignerComponent {

  files: File[] = [];
  postFiles: any[] = [];
  snapshot: any;
  signedFiles: any[] = [];

  constructor(private signerService: SignerService) { }
  
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
    
  }

  fileToBase64 (file: File) : Promise<string> {
    return new Promise<string> ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result?.toString() as string);
      reader.onerror = error => reject(error)
    })
  }
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSignFiles() {
    this.signerService.signatureCreate({documents: this.postFiles}).subscribe(response => {
      this.snapshot = response
    })
  }
}
