import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { NotificationModel } from 'src/app/Models/notification-model';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications-insert',
  templateUrl: './notifications-insert.component.html',
  styleUrls: ['./notifications-insert.component.scss']
})
export class NotificationsInsertComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    // this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
    //   () => { this.EditNotification(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  _NotificationModel: NotificationModel = this._APIService._NotificationModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;

  DefaultSelectcategory: string;
  DefaultSelectprogram: string;
  DefaultSelectseason: string;
  DefaultSelectepisode: string;

  _categoryIDName: ObjectIDName[];
  _ProgramIDName: ObjectIDName[];
  _SeasonIDName: ObjectIDName[];
  _EpisodeIDName: ObjectIDName[];

  ID            : number;
  title         : string;
  Descriptions  : string;
  IMG           : string;
  EpisodeID     : any;
  Visible       : boolean = true;
  EpisodeName   : string;

  CategoryID :number;
  ProgramID :number;
  SeasonID :number;
  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Initialize Variables
    this.DefaultSelectcategory = "إختر تصنيف من القائمة ";
    this.DefaultSelectprogram  = "";
    this.DefaultSelectseason   = "";
    this.DefaultSelectepisode  = "";

    this.FlagUpdate = false;
    
    this.ID          =null;
    this.title       =null;
    this.Descriptions=null;
    this.IMG         =null;
    this.EpisodeID   =null;
    this.Visible     =null;
    this.EpisodeName =null;    
    
    this.CategoryID = 0;
    this.ProgramID = 0;
    this.SeasonID = 0;

       //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        title: new FormControl('',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
          Descriptions: new FormControl('',
          [
            Validators.required
          ]),
          IMG: new FormControl('',
          [
            Validators.required
          ]),
          CategoryID: new FormControl('',
          [
            Validators.required
          ]),
          ProgramID: new FormControl('',
          [
            Validators.required
          ]),
          SeasonID: new FormControl('',
          [
            Validators.required
          ]),
          EpisodeName: new FormControl('',
          [
            Validators.required
          ]),
          // Visible: new FormControl('',
          // [
          //   Validators.required
          // ]),
      }
    );
    //#endregion

    //#region Start Functions
    this.CategoryDropDown();
    this.ProgramRelatedDropDown();
    this.SeasonsRelatedDropDown();
    this.EpisodeRelatedDropDown();
    //#endregion
  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إرسال التنبيه لكل المستخدمين بنجاح  ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل التنبيه بنجاح  ')
  }
  //#endregion

  //#region category DropDown
  CategoryDropDown() {
    this._APIService.CategoriesDropDown().subscribe(
      (data) => {
        this._categoryIDName = data;
        // this._categoryIDName = this._categoryIDName.filter(x => x.ID !== this._APIService._NotificationModel.AdStyleID);
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region program DropDown
  ProgramRelatedDropDown(id:number = 0) {
    this._APIService.ProgramRelatedDropDown(id).subscribe(
      (data) => { this._ProgramIDName = data; },
      (err) => {  }
    );
  }
  //#endregion

    //#region season DropDown
    SeasonsRelatedDropDown(ProgramID:number=0) {
      this._APIService.SeasonsRelatedDropDown(ProgramID).subscribe(
        (data) => { this._SeasonIDName = data; },
        (err) => {  }
      );
    }
    //#endregion

    //#region Episode DropDown
        EpisodeRelatedDropDown(SeasonID:number=0) {
          this._APIService.EpisodeRelatedDropDown(SeasonID).subscribe(
            (data) => { this._EpisodeIDName = data; },
            (err) => {  }
          );
        }
        //#endregion


  //#region Call Create Notification API -------
  InsertNotification() {
    this.FormDataImage.append('title', this.title);
    this.FormDataImage.append('Descriptions', this.Descriptions);
    this.FormDataImage.append('EpisodeID', this.EpisodeID);

   let result =  this._APIService.InsertNotification(this.FormDataImage).
      subscribe(data => {
        this.InsertAlert()
        this.router.navigate(['project/Notifications']);
      }, (err) => {
        this.InsertAlertError();
      });

      if(result == undefined)
        this.InsertAlertError();
  }
  //#endregion

  //#region review AND File FormData image from input file
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.FormDataImage.append('NotificationImg', files[0]);
  }
  //#endregion

  // //#region Edit Operation
  // EditNotification() {
  //   if (this._APIService._NotificationModel.ID != null) {

  //     this.FlagUpdate = true;

  //     this.ID              =this._APIService._NotificationModel.ID;         
  //     this.title       =this._APIService._NotificationModel.title;
  //     this.Descriptions=this._APIService._NotificationModel.Descriptions;
  //     this.IMG         = this._APIService.URL + this._APIService._NotificationModel.IMG;
  //     this.EpisodeID   =this._APIService._NotificationModel.EpisodeID;
  //     this.Visible     =this._APIService._NotificationModel.Visible;
  //     this.EpisodeName =this._APIService._NotificationModel.EpisodeName;
     

  //     this.DefaultSelectcategory =
  //     this.DefaultSelectprogram  =
  //     this.DefaultSelectseason   =
  //     this.DefaultSelectepisode  =
  //     console.log(" this.DefaultSelectStyle : ", this.DefaultSelectStyle);

  //   }
  // }
  // //#endregion

  // //#region Update Operation
  // UpdatePlacement() {
  //   if (this.FormDataImage != null) {
  //     this.ImageUpdate = this.FormDataImage;
  //   }
  //   else {
  //     this.ImageUpdate = this.ImagePath;
  //   }

  //   this._APIService.UpdatePlacement(this.ImageUpdate, this.ADPlaceholderID, this.ADPlaceholderCode, this.AdTargetId, this.AdStyleID, this.Title).subscribe(
  //     data => {
  //       console.log("Placement Updated Successfully ", data);
  //       this.CancelOperation();
  //       this.router.navigate(['/project/Placement']);
  //       this.UpdateAlert();
  //     },
  //     (err) => {
  //       console.log("error Updated", err)
  //     });
  // }
  // //#endregion

  // //#region Cancel Operation
  // CancelOperation() {

  //   this.FlagUpdate = false;

  //   this.ADPlaceholderID = null;
  //   this.ADPlaceholderCode = null;
  //   this.AdStyleID = null;
  //   this.AdTargetId = null;
  //   this.Title = null;
  //   this.ImagePath = null;

  //   this._APIService._PlacementModel.ADPlaceholderID = null;
  //   this._APIService._PlacementModel.ADPlaceholderCode = null;
  //   this._APIService._PlacementModel.AdStyleID = null;
  //   this._APIService._PlacementModel.AdTargetId = null;
  //   this._APIService._PlacementModel.ImagePath = null;
  //   this._APIService._PlacementModel.Title = null;

  //   this.DefaultSelectStyle = "أختر عنوان الابعاد من القائمة";
  //   this.DefaultSelectTarget = "أختر تارجت من القائمة";
  // }
  // //#endregion

  //#region selected Category handler
  selectChangeHandlerCategory(event: any) {
    this.CategoryID = event.target.value;
    this.ProgramRelatedDropDown(this.CategoryID);
  }
  //#endregion

  //#region selected Program handler
  selectChangeHandlerProgram(event: any) {
    this.ProgramID = event.target.value;
    this.SeasonsRelatedDropDown(this.ProgramID);
  }
  //#endregion

  //#region selected Season handler
  selectChangeHandlerSeason(event: any) {
    this.SeasonID = event.target.value;
    this.EpisodeRelatedDropDown(this.SeasonID);
  }
  //#endregion

    //#region selected Episode handler
    selectChangeHandlerEpisode(event: any) {
      this.EpisodeID = event.target.value;
    }
    //#endregion 

        //#region selected Episode handler
        selectChangeHandlerVisible(event: any) {
          this.Visible = event.target.value;
        }
        //#endregion 

}
