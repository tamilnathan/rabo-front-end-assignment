import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFileComponent } from '../import-file.component';
import {IssuesCsv} from '../__test__/import-file.component.mock';


describe('ImportFileComponent', () => {
  let component: ImportFileComponent;
  let fixture: ComponentFixture<ImportFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should import the data', async() => {
    const oFile = generateCsvFile();
    const fileData = await component.getFileData(oFile);
    component.setFileData(fileData);
    expect(component.rowData.length).toBeGreaterThan(0);
  });


  const generateCsvFile = ()=>{
    return new File([IssuesCsv], "issues.csv", { type: 'text/csv' });
  }

});
