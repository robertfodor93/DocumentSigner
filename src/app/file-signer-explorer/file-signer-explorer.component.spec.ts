import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSignerExplorerComponent } from './file-signer-explorer.component';

describe('FileSignerExplorerComponent', () => {
  let component: FileSignerExplorerComponent;
  let fixture: ComponentFixture<FileSignerExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSignerExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSignerExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
