import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { ProgramModel } from 'src/app/Models/program-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  
  Collection: CollectionData<ProgramModel>;
  ProgramList: ProgramModel[];
  ProgramListFiltered: ProgramModel[];
  Url: String;
  selectedCategory: any ;
  selectedProgram: any ;
  DefaultSelectCategory: string = " أختر تصنيف من القائمة - كل التصنيفات";
  DefaultSelectprogram: string  =  "أختر برنامج من القائمة ";
  SelectedProgram:boolean;

  _CategoryIDName: ObjectIDName[];
  _ProgramIDName: ObjectIDName[]=[{ID:0,Name:'أختر برنامج من القائمة'}];


  //#endregion

  //#region OnInit
  ngOnInit() {
    this.getPrograms();
    this.CategoriesDropDown();
    this.ProgramRelatedDropDown();
    this.SelectedProgram = true;
  }
  //#endregion

  //#region Alerts
   ProgramAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
    }
    DeleteAlerterr() {
      Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
    }
    DeleteProgramAlert() {
      Swal.fire('تم حذف البرنامج بنجاح  ')
    }
//#endregion

  //#region Categories DropDown
  CategoriesDropDown() {
    this._APIService.CategoriesDropDown().subscribe(
      (data) => {
        this._CategoryIDName = data;
        // this._CategoryIDName = this._CategoryIDName.filter(x => x.ID !== this._APIService.Program.CategoryId);
      },
      (err) => { }
    );
  }
  //#endregion

  //#region program DropDown
    ProgramRelatedDropDown(id:number = 0) {
      this._APIService.ProgramRelatedDropDown(id).subscribe(
        (data) => { 
          this._ProgramIDName = data; 
          if(this._ProgramIDName.length == 0)
          {
            this.DefaultSelectprogram = "لا يحتوى على برامج ";
            this.SelectedProgram = true;
          }
          else
          this.DefaultSelectprogram  =  "أختر برنامج من القائمة ";
        },
        (err) => {  }
      );
    }
    //#endregion

  //#region Get Program From API 
 getPrograms() {
  let Result =  this._APIService.GetPrograms().subscribe(
      (data) => {
        this.Collection = data;
        this.ProgramList = this.Collection.DataList;
        this.ProgramListFiltered = this.ProgramList;
        this.Url = this.Collection.Url;
        // console.log(this.ProgramList);
      },
      (err) => {  }
    );
    if (Result == undefined) { this.ProgramAlertError();}
  }



  //#endregion

  //#region Dialog
  openDialog(ProgramTitle: string, ID: number): void {
    let type = 'برنامج';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: ProgramTitle, ID: ID, flag: 2 } });
    DialogRef.afterClosed().subscribe
      (result => {
        if (result =='true' ) {
          //this.getPrograms();
          //this.ProgramListFiltered = this.ProgramList.filter(x => x.ProgramId !== ID);
           let result = this._APIService.DeleteProgram(ID).subscribe(
            response=>{this.DeleteProgramAlert();this.getPrograms(); },
          (err)=>{ this.DeleteAlerterr(); });
          if(result == undefined)
          this.ProgramAlertError();
        }
      });
  }
  //#endregion

  //#region Update Program
  UpdateProgram(
    ProgramId: number,
    ProgramDescription: string,
    ProgramName: string,
    CategoryName: string,
    InterviewerName: string,
    ProgramTypeName: string,
    ProgramImg: string,
    CategoryId: number,
    ProgramStartDate: string,
    InterviewerId: number,
    ProgramOrder: number,
    ProgramTypeId: number,
    ProgramVisible: boolean,
    hour:any,
    minute:any,
    _Date:string ,
    ProgramPromoUrl:string ){

    this._APIService.Program.ProgramId = ProgramId;
    this._APIService.Program.ProgramDescription = ProgramDescription;
    this._APIService.Program.ProgramName = ProgramName;
    this._APIService.Program.CategoryName = CategoryName;
    this._APIService.Program.InterviewerName = InterviewerName;
    this._APIService.Program.ProgramTypeName = ProgramTypeName;
    this._APIService.Program.ProgramImg = ProgramImg;
    this._APIService.Program.CategoryId = CategoryId;
    this._APIService.Program.ProgramStartDate = ProgramStartDate;
    this._APIService.Program.InterviewerId = InterviewerId;
    this._APIService.Program.ProgramOrder = ProgramOrder;
    this._APIService.Program.ProgramTypeId = ProgramTypeId;
    this._APIService.Program.ProgramVisible = ProgramVisible;
    this._APIService.Program.Hour = hour;
    this._APIService.Program.Minute = minute;
    this._APIService.Program.Date = _Date;
    this._APIService.URL = this.Url;
    this._APIService.Program.ProgramPromoUrl = ProgramPromoUrl;

    this._APIService.sendClickEventProgram();
    this.router.navigateByUrl('project/createProgram');
  }
  //#endregion

  //#region selected Category handler
    selectChangeHandler(event: any) 
    {
      this.selectedCategory = event.target.value;
      this.SelectedProgram = false;
      if(this.selectedCategory != "n")
      this.ProgramRelatedDropDown(this.selectedCategory);
      else {
        this._ProgramIDName=[]
        this.DefaultSelectprogram  =  "أختر برنامج من القائمة ";   
        this.ProgramListFiltered = this.ProgramList; 
        this.SelectedProgram = true;
       }
    }
    //#endregion

  //#region selected Category handler
  selectChangeHandlerCategory(event: any) {
    this.selectedProgram = event.target.value;
    if(this.selectedProgram != "n")
    this.ProgramListFiltered = this.ProgramList.filter(x=>x.ProgramId ==  +this.selectedProgram  );
  }
  //#endregion
}
