import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Snapshot } from '../_core/models/snapshot';
import { SignerService } from '../_core/services/signer.service';
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-file-signer',
  templateUrl: './file-signer.component.html',
  styleUrls: ['./file-signer.component.scss']
})
export class FileSignerComponent {

  files: File[] = [];
  base64Files: any[] = [];
  contents: any[] = [];
  snapshot: Snapshot = {};
  signedFiles: any[] = [];
  viewerUrl: any;
  dataSource = new MatTableDataSource(this.base64Files)
  selection = new SelectionModel<any>(true, [])
  displayedColumns: string[] = ['select', 'name','action'];

  constructor(private signerService: SignerService) { }

  onSelect(event: any) {
    this.files.push(...event.addedFiles)
    if (this.files && this.files[0]) {
      for (let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i])
          .then(result => {
            const base64String = result.replace('data:', '')
              .replace(/^.+,/, '');
            if (this.files[i].name != this.base64Files[i]?.name) {
              this.base64Files.push({ name: this.files[i].name, content: base64String });
              this.dataSource = new MatTableDataSource(this.base64Files);
              console.warn(this.dataSource.data.length)
            }
          });
      }
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() as string);
      reader.onerror = error => reject(error);
    })
  }

  onDownload(event?: any) {
    for (let i = 0; i < this.base64Files.length; i++) {
      if (this.base64Files[i] == event) {
        let base64String = event.content;
        let fileName = event.name;
        this.downloadPdf(base64String, fileName);
      }
    }
    this.selection.selected.forEach((selected: any) => {
      let base64String = selected.content;
      let fileName = selected.name;
      this.downloadPdf(base64String, fileName);
    })
    this.selection = new SelectionModel<Element>(true, [])
  }

  downloadPdf(base64String: string, fileName: string) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`;
    link.click();
  }

  onRemove(event?: any) {
    for (let i = 0; i < this.base64Files.length; i++) {
      if (this.base64Files[i] == event) {
        let index = this.files.indexOf(event);
        this.base64Files.splice(index, 1);
        this.files.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.base64Files);
      } else {
        this.selection.selected.forEach((selected: any) => {
          let index = this.base64Files.findIndex((file) => file === selected);
          this.base64Files.splice(index, 1)
          this.files.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.base64Files);
        });
      }
    }
    this.selection = new SelectionModel<Element>(true, [])
  }

  onSignFiles() {
    let args = {
      documentSigner: {
        args: {
          digestSigner: {
            factory: "de.intarsys.security.app.signature.SignerFactory",
            args: {
              device: "default@demo"
            }
          },
          field: {
            position: "100x100",
            size: "200x100",
            pageRange: "all",
          },
          decorator: {
            factory: "de.intarsys.security.document.type.pdf.signature.ExtendedDecoratorFactory"
          },
          args: {
            text: "Signed by ${digestsigner.subject.CN}"
          }
        }
      }
    };

    this.signerService.signatureCreate({ documents: this.selection.selected, args }).subscribe(response => {
      for (let i = 0; i < this.base64Files.length; i++) {
        for (let j = 0; j < response.snapshot.stage.result.value.signatures.length; j++) {
          if (this.base64Files[i].name == response.snapshot.stage.result.value.signatures[j].name) {
            this.base64Files[i].content = response.snapshot.stage.result.value.signatures[j].content;
            break;
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.base64Files);
    });
  }

  onSignFile(event: any) {
    let index = this.base64Files.indexOf(event);
    let selectedFile = [this.base64Files[index]]
    let args = {
      documentSigner: {
        args: {
          digestSigner: {
            factory: "de.intarsys.security.app.signature.SignerFactory",
            args: {
              device: "default@demo"
            }
          },
          field: {
            position: "100x100",
            size: "200x100",
            pageRange: "all",
          },
          decorator: {
            factory: "de.intarsys.security.document.type.pdf.signature.ExtendedDecoratorFactory"
          },
          args: {
            text: "Signed by ${digestsigner.subject.CN}"
          }
        }
      }
    };
    this.signerService.signatureCreate({ documents: selectedFile, args }).subscribe(response => {
      for (let i = 0; i < this.base64Files.length; i++) {
        if (this.base64Files[i].name == response.snapshot.stage.result.value.signatures[0].name) {
          this.base64Files[i].content = response.snapshot.stage.result.value.signatures[0].content;
          break;
        }
      }
      this.dataSource = new MatTableDataSource(this.base64Files);
    });
  }

  slectorChecker() {
    console.warn(this.selection.selected);
  }

  onOpenViewer(event: any) {
    let index = this.base64Files.indexOf(event);
    console.warn(index);
    this.signerService.viewCreate({ document: this.base64Files[index] }).subscribe(response => {
      this.snapshot = response;
      window.open(this.snapshot.snapshot?.stage.url);
      this.dataSource = new MatTableDataSource(this.base64Files);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }

  masterToggle() {
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(file => this.selection.select(file));
    }
  }
}
