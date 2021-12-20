import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { ProgramTypeModel } from 'src/app/Models/program-type-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-program-type-list',
  templateUrl: './program-type-list.component.html',
  styleUrls: ['./program-type-list.component.scss']
})
export class ProgramTypeListComponent implements OnInit {

    //#region Constructor
    constructor(public _APIService:APIService ,
      public Dialog:MatDialog , 
      private router: Router){}
    //#endregion

    //#region Declare Variables
    ProgramType_Url : CollectionData<ProgramTypeModel>;
    ProgramTypeDataList : ProgramTypeModel[];
    Url:String;

    //#endregion

    //#region On Init
    ngOnInit() {
      this.GetProgramTypes();   
    }
    //#endregion

    //#region Alerts
    ProgramAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
    }
    DeleteAlerterr() {
      Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
    }
    DeleteProgramTypeAlert() {
      Swal.fire('تم حذف نوع البرنامج  بنجاح  ')
    }
    //#endregion

    //#region Get Program Types
    GetProgramTypes()
    {
      this._APIService.GetProgramTypes().subscribe(
        (data)=>
        {
          this.ProgramType_Url = data;
          this.ProgramTypeDataList = this.ProgramType_Url.DataList;
          this.Url = this.ProgramType_Url.Url;
        },
        (err)=>{}
      );
    }
    //#endregion

    //#region open Dialog
    openDialog(DataTitle : string , ID:number): void 
      {
        let type = 'نوع برنامج ';
        let DialogRef =   this.Dialog.open(DialogExampleComponent , {data:{type:type,name:DataTitle,ID:ID , flag:3}});
          DialogRef.afterClosed().subscribe(result=>{
          // console.log(result);
          if(result == 'true')
          {
            let result = this._APIService.DeleteProgramType(ID).subscribe(
              response=>{ this.DeleteProgramTypeAlert();this.GetProgramTypes() },
            (err)=>{ this.DeleteAlerterr(); });
            
            if(result == undefined)
            this.ProgramAlertError();
          }
      });
      }
    //#endregion

    //#region Update Program Type
    UpdateProgramType(
      ProgramTypeId : number,                          
      ProgramTypeTitle:string,                          
      ProgramTypeImgPath:string,                          
      ProgramTypeOrder:number)
        {

        this._APIService.ProgramType.ProgramTypeId = ProgramTypeId;
        this._APIService.ProgramType.ProgramTypeTitle = ProgramTypeTitle;
        this._APIService.ProgramType.ProgramTypeOrder =ProgramTypeOrder;
        this._APIService.ProgramType.ProgramTypeImgPath = ProgramTypeImgPath;
        this._APIService.URL = this.ProgramType_Url.Url;
        this._APIService.sendClickEvent();
        this.router.navigateByUrl('project/CreateProgramType');
        }
    //#endregion

}
