import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { SeasonModel } from 'src/app/Models/season-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {


  //#region Constructor
      constructor(public _APIService:APIService ,
        public Dialog:MatDialog , 
        private router: Router){}
      //#endregion

  //#region Declare Variables
      SeasonDataList : SeasonModel[];
      SeasonDataListFiltered : SeasonModel[];
      _SeasonIDName: ObjectIDName[]=[{ID:0,Name:'أختر موسم من القائمة'}];
      ProgramList: ObjectIDName[];
      selectedProgram:any;
      selectedSeason:any;
      DefaultselectedProgram:any = "أختر برنامج من القائمة - إظهار الكل";
      SelectSeason:boolean;
      DefaultSelectseason:any ="أختر موسم من القائمة - إظهار الكل";

      //#endregion

  //#region On Init
      ngOnInit() {
        this.selectedProgram = " أختر برنامج من القائمة - إظهار الكل ";
        this.DefaultSelectseason ="أختر موسم من القائمة - إظهار الكل";
        this.SelectSeason = true;
        this.GetSeason(); 
        this.ProgramRelatedDropDown();  
      }
      //#endregion

  //#region Alerts
  ProgramAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }
    DeleteAlerterr() {
      Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
    }
    DeleteSeasonAlert() {
      Swal.fire('تم حذف الموسم بنجاح  ')
    }
  //#endregion

  //#region program DropDown
    ProgramRelatedDropDown() {
      this._APIService.ProgramDropDown().subscribe(
        (data) => {  this.ProgramList = data;  },
        (err) => {  } ); }
    //#endregion

  //#region season DropDown
    SeasonsRelatedDropDown(ProgramID:number=0) {
      this._APIService.SeasonsRelatedDropDown(ProgramID).subscribe(
        (data) => 
        {

          this._SeasonIDName = data;
          this.DefaultSelectseason ="أختر موسم من القائمة";
          this.SelectSeason = false

           if(this._SeasonIDName.length == 0)
           {
             this.DefaultSelectseason = "لا يوجد مواسم ";
             this.SelectSeason = true
          }
        },
        (err) => {  }
      );
    }
    //#endregion

  //#region test Ref => Output
    consooool(hh:string){
      // console.log(hh)
    }
    //#endregion

  //#region Get Seasons
  GetSeason()
  {
    this._APIService.GetSeason().subscribe(
      (data)=>
      {
        this.SeasonDataList = data;
        this.SeasonDataListFiltered = this.SeasonDataList;
      },
      (err)=>{}
    );
  }
  //#endregion

  //#region open Dialog
      openDialog(DataTitle : string , ID:number): void 
        {
          let type = 'الموسم ';
          let DialogRef =   this.Dialog.open(DialogExampleComponent , {data:{type:type,name:DataTitle,ID:ID , flag:4}});
            DialogRef.afterClosed().subscribe(result=>{
            if(result == 'true')
            {
              this.GetSeason();
              // this.SeasonDataListFiltered = this.SeasonDataListFiltered.filter(x=>x.SessionId !== ID);
              // this._SeasonIDName = this._SeasonIDName.filter(x=>x.ID !== ID);
              let result = this._APIService.DeleteSeason(ID).subscribe(
                response=>{ this.DeleteSeasonAlert(); this.GetSeason();},
              (err)=>{ this.DeleteAlerterr(); });
              if(result == undefined)
              this.ProgramAlertError();
            }
        });
        }
      //#endregion

  //#region Update Program Type
      UpdateSeason(
        SessionId : number,                          
        SessionTitle:string,                          
        ProgramId:number,                          
        SeasonViews:number,
        ProgramName:string)
          {

          this._APIService._SeasonModel.SessionId = SessionId;
          this._APIService._SeasonModel.SessionTitle = SessionTitle;
          this._APIService._SeasonModel.SeasonViews = SeasonViews;
          this._APIService._SeasonModel.ProgramId = ProgramId;
          this._APIService._SeasonModel.ProgramName = ProgramName;

          this._APIService.sendClickEvent();
          this.router.navigateByUrl('project/createSeason');
          }
      //#endregion

  //#region selected Program handler
  selectChangeHandlerProgram(event: any) {
    this.selectedProgram = event.target.value;
    if(this.selectedProgram !="n")
    {
      this.SeasonDataListFiltered = this.SeasonDataList.filter(x=>x.ProgramId == this.selectedProgram);
      this.SeasonsRelatedDropDown(this.selectedProgram);
    }
    else
    {
      this.SelectSeason = true;
      this._SeasonIDName = [{ID:0,Name:'أختر برنامج من القائمة - إظهار الكل'}];
      this.DefaultSelectseason = " أختر موسم من القائمة - إظهار الكل ";
      this.SeasonDataListFiltered = this.SeasonDataList;
    }
  }
  //#endregion
  
  //#region selected Season handler
    selectChangeHandlerSeason(event: any) {
      this.selectedSeason = event.target.value;
      if(this.selectedSeason !="n")
      this.SeasonDataListFiltered = this.SeasonDataList.filter(x=>x.SessionId == this.selectedSeason);
      else
      {
        this.SeasonDataListFiltered = this.SeasonDataList.filter(x=>x.ProgramId == this.selectedProgram);
      }
    }
  //#endregion

}
