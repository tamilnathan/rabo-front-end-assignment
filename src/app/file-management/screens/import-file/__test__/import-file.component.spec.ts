import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFileComponent } from '../import-file.component';
import {IssuesCsv, TextFileContent} from '../__test__/import-file.component.mock';


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

  it('check if the file is csv format or not', () => {
    const oCsvFile = generateCsvFile();
    expect(component.isValidFile(oCsvFile)).toBeTrue();
    const oTxtFile = generateTextFile();
    expect(component.isValidFile(oTxtFile)).toBeFalse();
  });

  it('should import the data', async()=>{
    const oFile = generateCsvFile();
    const fileData = await component.getFileData(oFile);
    component.setFileData(fileData);
    expect(component.rowData.length).toBeGreaterThan(0);
  });

  const generateCsvFile = ()=>{
    return new File([IssuesCsv], "issues.csv", { type: 'text/csv' });
  }

  const generateTextFile = ()=>{
    return new File([TextFileContent], "test.txt", { type: 'text/plain' });
  }

});
