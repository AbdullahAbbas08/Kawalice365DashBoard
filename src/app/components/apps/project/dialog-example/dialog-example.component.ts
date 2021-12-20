import { Component, OnInit , Inject, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/ApiServices/api.service';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService:APIService,public Dialog:MatDialog , @Inject(MAT_DIALOG_DATA) public data:any)
   { this.Flag = this.data.flag }
  //#endregion

  //#region Declare Variables
  DataName : string;
  Flag : number;
  //#endregion

  //#region ng OnInit
  ngOnInit(): void
  { this.Flag = this.data.flag }
  //#endregion

//#region Alerts

DeleteAlerterr() {
  Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
}



//#endregion

  //#region General Delete
  GeneralDelete(Flag:number)
  {
      if(Flag == 1)
      {
        this.DeleteCategory();
      }

      if(Flag == 2)
      {
        this.DeleteProgram();
      }

      if(Flag == 3)
      {
        this.DeleteProgramType();
      }

      if(Flag == 4)
      {
        this.DeleteSeason();
      }
      if(Flag == 5)
      {
        this.DeleteEpisode();
      }
      if(Flag == 6)
      {
        this.DeleteInterviewer();
      }
      if(Flag == 7)
      {
        this.DeleteTarget();
      }
      if(Flag == 8)
      {
        this.DeleteStyle();
      }
      if(Flag == 9)
      {
        this.DeletePlacement();
      }
      if(Flag == 10)
      {
        this.DeleteAds();
      }

      if(Flag == 11)
      {
        this.DeleteNotification();
      }
  }
  //#endregion

  //#region Delete Category
  DeleteCategory()
  {
    this.DataName = this.data.DataTitle;

  }
  //#endregion

    //#region Delete Program Type
    DeleteProgramType()
    {
      this.DataName = this.data.DataTitle;
     
    }
    //#endregion

  //#region Delete Program
  DeleteProgram()
  {
    this.DataName = this.data.DataTitle;
   
  }
  //#endregion 

    //#region Delete Program
    DeleteSeason()
    {
      this.DataName = this.data.DataTitle;

    }
    //#endregion 

        //#region Delete Program
        DeleteEpisode()
        {
          this.DataName = this.data.DataTitle;

        }
        //#endregion 

        //#region Delete Program
        DeleteInterviewer()
        {
          this.DataName = this.data.DataTitle;
         
        }
        //#endregion 

      //#region Delete Program
      DeleteTarget()
      {
        this.DataName = this.data.DataTitle;
        
      }
      //#endregion 

      //#region Delete Style ADS
      DeleteStyle()
      {
        this.DataName = this.data.DataTitle;
        
      }
      //#endregion 

      //#region Delete Placement ads
      DeletePlacement()
      {
        this.DataName = this.data.DataTitle;
       
      }
      //#endregion

      //#region Delete  ADS
      DeleteAds()
      {
        this.DataName = this.data.DataTitle;
       
      }
      //#endregion

      //#region Delete Notification
      DeleteNotification()
      {
        this.DataName = this.data.DataTitle;
        
      }
      //#endregion

}
