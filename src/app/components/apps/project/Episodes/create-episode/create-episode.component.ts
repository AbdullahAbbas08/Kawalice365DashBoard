import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { EpisodeModel } from 'src/app/Models/episode-model';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss']
})
export class CreateEpisodeComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
      () => { this.EditEpisode(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  Episode: EpisodeModel = this._APIService._EpisodeModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;

  DefaultSelectSeason: string;
  DefaultSelectVisible: any;
  SelectHour: any;
  SelectMinute: any;
  SeasonName: string;

  _SeasonIDName: ObjectIDName[];
  _ProgramIDName: ObjectIDName[] = [{ID:0,Name:'أختر برنامج من القائمة'}];

  SeasonObject: ObjectIDName;
  EpisodeId: number;
  EpisodeTitle: string;
  EpisodeDescription: string;
  EpisodeUrl: string;
  EpisodeVisible: boolean;
  EpisodePublishDate: string;
  SessionId: number;
  EpisodeImg: string;
  SeasonTitle: string;
  Date: string;
  Hour: any;
  Minute: any;
  changeDate: boolean = false;
  ProgramID: number;
  DefaultSelectprogram: any = "أختر برنامج من القائمة";
  SelectSeason : boolean = true ;
  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Initialize Variables
    this.SelectSeason = true;
    this.DefaultSelectprogram = "أختر برنامج من القائمة";
    this.DefaultSelectSeason = "أختر موسم من القائمة";
    this.SelectHour = "أختر الساعة ";
    this.SelectMinute = "أختر الدقيقة";
    this.DefaultSelectVisible = "نعم";

    this.FlagUpdate = false;

    this.EpisodeId = null;
    this.EpisodeTitle = "";
    this.EpisodeDescription = "";
    this.EpisodeUrl = "";
    this.EpisodeVisible = true;
    this.EpisodePublishDate = "";
    this.SessionId = null;
    this.SeasonName = ""
    this.EpisodeImg = null;
    this.SeasonTitle = "";
    //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        EpisodeTitle: new FormControl('',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
        EpisodeDescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10000)
          ]),
        SeasonName: new FormControl('',
          [
            Validators.required
          ]),
        EpisodeUrl: new FormControl('',
          [
            Validators.required
          ]),
        EpisodePublishDate: new FormControl('',
          [
            Validators.required
          ]),
          ProgramID: new FormControl('',
        [
          Validators.nullValidator
        ]),
        EpisodeImg: new FormControl('',
          [
            Validators.required
          ]),
        Hour: new FormControl('',
          [
            Validators.required
          ]),
        Minute: new FormControl('',
          [
            Validators.required
          ]),
      }
    );
    //#endregion
    //#region Start Functions
    this.ProgramDropDown();
    this.EditEpisode();
    //#endregion

  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة الحلقة بنجاح  ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل الحلقة بنجاح  ')
  }
  //#endregion

  //#region Categories DropDown
  ProgramDropDown() {
    this._APIService.ProgramDropDown().subscribe(
      (data) => {
        this._ProgramIDName = data;
        this._ProgramIDName = this._ProgramIDName.filter(x => x.ID !== this._APIService._SeasonModel.ProgramId);
      },
      (err) => { }
    );
  }
  //#endregion

  //#region Season DropDown
  SeasonsRelatedDropDown(programID: number) {
    this._APIService.SeasonsRelatedDropDown(programID).subscribe(
      (data) => {
        this._SeasonIDName = data;
        this._SeasonIDName = this._SeasonIDName.filter(x => x.ID !== this._APIService._EpisodeModel.SessionId);
      },
      (err) => { }
    );
  }
  //#endregion

  //#region Set Episode Start Date
  SetDate(event: any) {
    //this.EpisodePublishDate = event.target.value;
    // console.log("date is changed");
    this.changeDate = true;
  }
  //#endregion

  //#region Call Create Episode API -------
  CreateEpisode() {
    this.FormDataImage.append('Description', this.EpisodeDescription);
    this._APIService.CreateEpisode(this.FormDataImage,
      this.EpisodeTitle,
      this.EpisodeUrl,
      this.EpisodeVisible,
      this.Date,
      this.SessionId,
      this.Hour,
      this.Minute).
      subscribe(data => {
        this.InsertAlert()
        this.router.navigate(['project/Episodes']);
      }, (err) => {
        this.InsertAlertError();
      });
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

    this.FormDataImage.append('EpisodeIamge', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditEpisode() {
    if (this._APIService._EpisodeModel.EpisodeTitle != null) {
      this.FlagUpdate = true;

      this.EpisodeId = this._APIService._EpisodeModel.EpisodeId;
      this.EpisodeTitle = this._APIService._EpisodeModel.EpisodeTitle;
      this.EpisodeDescription = this._APIService._EpisodeModel.EpisodeDescription;
      this.EpisodeUrl = this._APIService._EpisodeModel.EpisodeUrl;
      this.EpisodeVisible = this._APIService._EpisodeModel.EpisodeVisible;
      this.EpisodePublishDate = this._APIService._EpisodeModel.EpisodePublishDate;
      this.SessionId = this._APIService._EpisodeModel.SessionId;
      this.EpisodeImg = this._APIService.URL + this._APIService._EpisodeModel.EpisodeImg;
      this.SeasonTitle = this._APIService._EpisodeModel.SeasonTitle;
      this.Date = this._APIService._EpisodeModel.Date;
      this.Hour = this._APIService._EpisodeModel.Hour;
      this.Minute = this._APIService._EpisodeModel.Minute;


      this.SeasonName = this.SeasonTitle;
      this.DefaultSelectVisible = this.EpisodeVisible;
      this.SelectHour = this.Hour;
      this.SelectMinute = this.Minute;
      this.DefaultSelectSeason = this.SeasonName;

    }
  }
  //#endregion

  //#region Update Operation
  UpdateEpisode() {
    if (this.FormDataImage != null) {
      this.ImageUpdate = this.FormDataImage;
    }
    else {
      this.ImageUpdate = this.EpisodeImg;
    }
    this.FormDataImage.append('Description', this.EpisodeDescription);

    this._APIService.UpdateEpisode(this.ImageUpdate, this.EpisodeId, this.EpisodeTitle, this.EpisodeUrl, this.EpisodeVisible, this.Date, this.Hour, this.Minute, this.SessionId, this.changeDate).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigate(['/project/Episodes']);
        this.UpdateAlert();
      },
      (err) => {
      });
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;

    this.EpisodeTitle = null;
    this.EpisodeDescription = null;
    this.EpisodeUrl = null;
    this.EpisodeVisible = true;
    this.EpisodePublishDate = null;
    this.SessionId = null;
    this.imgURL = null;
    this.EpisodeImg = null;

    this._APIService._EpisodeModel.EpisodeId = null;
    this._APIService._EpisodeModel.EpisodeTitle = null;
    this._APIService._EpisodeModel.EpisodeDescription = null;
    this._APIService._EpisodeModel.EpisodeUrl = null;
    this._APIService._EpisodeModel.EpisodeImg = null;
    this._APIService._EpisodeModel.EpisodeVisible = null;
    this._APIService._EpisodeModel.EpisodeViews = null;
    this._APIService._EpisodeModel.EpisodePublishDate = null;
    this._APIService._EpisodeModel.SessionId = null;
    this._APIService._EpisodeModel.SeasonTitle = null;
    this._APIService._EpisodeModel.ProgramId = null;
    this._APIService._EpisodeModel.ProgramName = null;
    this._APIService._EpisodeModel.CategoryId = null;
    this._APIService._EpisodeModel.CategoryTitle = null;
    this._APIService._EpisodeModel.ProgramTypeId = null;
    this._APIService._EpisodeModel.ProgramTypeTitle = null;

    this.DefaultSelectSeason = "أختر تصنيف من القائمة";
    this.SelectHour = "أختر الساعة ";
    this.SelectMinute = "أختر الدقيقة";
    this.DefaultSelectVisible = true;
    this.router.navigate(['/project/Episodes']);
  }
  //#endregion

  //#region selected Season handler
  selectChangeHandlerSeason(event: any) {
    this.SessionId = event.target.value;
    // console.log(this.SessionId);
  }
  //#endregion

  //#region selected Hour handler
  selectChangeHandlerHour(event: any) {
    this.Hour = event.target.value;
  }
  //#endregion

  //#region selected Minute handler
  selectChangeHandlerMinute(event: any) {
    this.Minute = event.target.value;
  }
  //#endregion

  //#region selected select Change Handler Visible
  selectChangeHandlerVisible(event: any) {
    //this.CategoryVisible = event.target.value;
    var element = <HTMLInputElement>document.getElementById("checkbox1");
    this.EpisodeVisible = element.checked;
  }
  //#endregion

  //#region selected Program handler
  selectChangeHandlerProgram(event: any) {
   let valueSelected  = event.target.value;
   if(valueSelected != 'n')
   {
    // this.SelectSeason = false;
    this.SeasonsRelatedDropDown(valueSelected);
   }
   else
   {
    // this.SelectSeason = true;
   }
  }
  //#endregion

}
