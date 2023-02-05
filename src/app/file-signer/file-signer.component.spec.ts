import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSignerComponent } from './file-signer.component';

describe('FileSignerComponent', () => {
  let component: FileSignerComponent;
  let fixture: ComponentFixture<FileSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
