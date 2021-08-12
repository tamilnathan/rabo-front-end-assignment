import {Component, ElementRef, ViewChild} from '@angular/core';

import {RowData} from '../../interfaces/import-file.interface';

const FILE_SIZE = 1000000;
const FILE_SIZE_DIVIDER = 20;
const FILE_FORMAT = '.csv';
const COLUMN_TEXT = 'column';

@Component({
    selector:'rabo-import-file',
    templateUrl:'./import-file.component.html',
    styleUrls:['./import-file.component.scss'],
})
export class ImportFileComponent{
@ViewChild('file', { static: true }) private _fileType: ElementRef | any;
public columnDefs:any[] = [];
public rowData:RowData[] = [];
public isInvalidFileFormat = false;
public isInvalidFileSize = false;

public async onSelectFile(fileObj?:File){
    const oFile =  fileObj ? fileObj : this._fileType.nativeElement.files[0];
    if(oFile && this._isValidFile(oFile)){
        const fileContent = await this.getFileData(oFile);
        this.setFileData(fileContent);
    } else {
        this.rowData = [];
    }    
}

private _isValidFile(oFile:File):boolean{
    const{name:fileName,size:fileSize} = oFile; 
    this.isInvalidFileFormat = false;
    this.isInvalidFileSize = false;
     if(!(fileName.endsWith(FILE_FORMAT))){
         this.isInvalidFileFormat = true;
     }
     if(Math.floor(fileSize / FILE_SIZE) > FILE_SIZE_DIVIDER){
         this.isInvalidFileSize = true;
     }
     return !(this.isInvalidFileFormat || this.isInvalidFileSize);
}

public getFileData(file:Blob):Promise<any> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target?.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
}

public setFileData(fileContent:string):void{
    const columnDefs:any[] = [];
    const rowData:RowData[] = [];
    let oColumnData = {};
    const fileContentList = fileContent.split(/\r\n|\n/);  
    fileContentList.forEach((fileData, index)=>{
        const fileDataList = fileData.split(',');
        if(index===0){
            fileDataList.forEach((header,headerIndex)=>{
              columnDefs.push({headerName:header,field:`${COLUMN_TEXT}${headerIndex+1}`, filter:true});
           });
        } else {
            fileDataList.forEach((columnData,columnIndex)=>{
               oColumnData = {...oColumnData, ...{[`${COLUMN_TEXT}${columnIndex+1}`]:columnData}};
            });
            rowData.push(oColumnData);
        }
    });
    this.columnDefs = columnDefs;
    this.rowData = rowData;
}
}
