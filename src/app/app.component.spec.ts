import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ImportFileComponent } from '../app/file-management/screens/import-file/import-file.component';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ImportFileComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
