import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { AdsModel } from 'src/app/Models/ads-model';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { ObjectIDNameClient } from 'src/app/Models/object-idname-client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-advertisment',
  templateUrl: './create-advertisment.component.html',
  styleUrls: ['./create-advertisment.component.scss']
})
export class CreateAdvertismentComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
      () => { this.EditAds(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  _AdsModel: AdsModel = this._APIService._AdsModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;

  DefaultSelectClient: string;
  DefaultSelectPlacement: string;

  _ClientIDName: ObjectIDNameClient[];
  _PlacementIDName: ObjectIDName[];
  AdId: number;
  AdTitle: string;
  ImagePath: string;
  URL: string;
  Views: number;
  PlaceHolderID: number;
  ClientID: string;
  ClientName: string;
  PublishStartDate: string;
  PublishEndDate: string;
  PlaceHolderCode: string;
  SelectHour: any    = "أختر الساعة ";
  SelectMinute: any  = "أختر الدقيقة";;
  SelectHourd:any    = "أختر الساعة ";;
  SelectMinuted:any  = "أختر الدقيقة";;

  changeDate: boolean = false;
  changeDated: boolean = false;
  Hours: any;
  Minutes: any;
  Dates: string;
  Hourd: any;
  Minuted: any;
  Dated: string;

  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Initialize Variables

    this.DefaultSelectClient = "أختر عميل من القائمة";
    this.DefaultSelectPlacement = "أختر كود مكان الإعلان ";
    this.SelectHour = "أختر الساعة ";
    this.SelectMinute = "أختر الدقيقة";
    this.SelectHourd = "أختر الساعة ";
    this.SelectMinuted = "أختر الدقيقة";
    this.FlagUpdate = false;

    this.AdId = null;
    this.AdTitle = null;
    this.ImagePath = null;
    this.URL = null;
    this.Views = null;
    this.PlaceHolderID = null;
    this.PlaceHolderCode = null;
    this.ClientID = null;
    this.ClientName = null;
    this.PublishStartDate = null;
    this.PublishEndDate = null;

    //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        AdTitle: new FormControl('', //1
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
        URL: new FormControl('',//4
          [
            Validators.required
          ]),
        ClientName: new FormControl('',//2
          [
            Validators.required
          ]),
        PlaceHolderCode: new FormControl('',//3
          [
            Validators.required
          ]),
        ImagePath: new FormControl('',//12
          [
            Validators.required
          ]),
          Dates: new FormControl('',//5
          [
            Validators.required
          ]),
          Dated: new FormControl('',//9
          [
            Validators.required
          ]),
         SelectHour: new FormControl('',//7
          [
            Validators.required
          ]),
         SelectMinute: new FormControl('',//8
          [
            Validators.required
          ]),
          SelectMinuted: new FormControl('',//8
          [
            Validators.required
          ]),
          SelectHourd: new FormControl('',//10
          [
            Validators.required
          ]),
      }
    );
    //#endregion 

    //#region Start Functions
    this.ClientDropDown();
    this.PlacementDropDown();
    this.EditAds();
    //#endregion
  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة الإعلان بنجاح  ')
  }
  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }
  UpdateAlert() {
    Swal.fire('تم تعديل الإعلان بنجاح  ')
  }
  usersErrorMessege() {
    Swal.fire('حدث خطأ فى إيجاد المستخدمين ! برجاء المحاولة مرة اخرى ')
  }
  PlacementErrorMessege() {
    Swal.fire(' حدث خطأ فى إيجاد كود مكان الإعلان برجاء المحاولة مرة أخرى')
  }
  //#endregion

  //#region Placement DropDown
  PlacementDropDown() {
    let result = this._APIService.PlacementDropDown().subscribe(
      (data) => {
        this._PlacementIDName = data;
        this._PlacementIDName = this._PlacementIDName.filter(x => x.ID !== this._APIService._AdsModel.PlaceHolderID);
      },
      (err) => { }
    );

    if(result == undefined)
    this.PlacementErrorMessege();
  }

  //#endregion

  //#region Client DropDown
  ClientDropDown() {
    let result = this._APIService.ClientDropDown().subscribe(
      (data) => {
        this._ClientIDName = data;
        this._ClientIDName = this._ClientIDName.filter(x => x.ID !== this._APIService._AdsModel.ClientID);
      },
      (err) => { }
    );
    if(result == undefined)
      this.usersErrorMessege();
  }
  //#endregion

  //#region Set Episode Start Date
  SetPublishStartDate(Date: any) {
    this.PublishStartDate = Date;
  }
  //#endregion

  //#region Set Episode Start Date
  SetPublishEndDate(Date: any) {
    this.PublishEndDate = Date;
  }
  //#endregion

  //#region Call Create Episode API -------
  CreateADS() {
  //this._APIService.UpdateAds(this.ImageUpdate,   this.AdTitle, this.URL, this.PlaceHolderID, this.ClientName, this.Dates, this.Dated , this.SelectHour , this.SelectHourd ,this.SelectMinute,this.SelectMinuted ).subscribe(
    let result = this._APIService.CreateADS(this.FormDataImage, this.AdTitle, this.URL, this.PlaceHolderID, this.ClientName, this.Dates, this.Dated , this.SelectHour , this.SelectHourd ,this.SelectMinute,this.SelectMinuted ).
      subscribe(data => {
        this.InsertAlert()
        this.router.navigate(['project/Advertisment']);
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

    this.FormDataImage.append('AdsImage', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditAds() {
    if (this._APIService._AdsModel.AdTitle != null) {
      this.FlagUpdate = true;

      this.AdId = this._APIService._AdsModel.AdId;
      this.AdTitle = this._APIService._AdsModel.AdTitle;
      this.ImagePath = this._APIService.URL + this._APIService._AdsModel.ImagePath;
      this.URL = this._APIService._AdsModel.URL;
      this.Views = this._APIService._AdsModel.Views;
      this.PlaceHolderID = this._APIService._AdsModel.PlaceHolderID;
      this.ClientID = this._APIService._AdsModel.ClientID;
      this.ClientName = this._APIService._AdsModel.ClientName;
      this.PublishStartDate = this._APIService._AdsModel.PublishStartDate;
      this.PublishEndDate = this._APIService._AdsModel.PublishEndDate;
      this.PlaceHolderCode = this._APIService._AdsModel.PlaceHolderCode;
      this.Dates = this._APIService._AdsModel.Dates;
      this.Dated = this._APIService._AdsModel.Dated;
      this.Hours = this._APIService._AdsModel.Hours;
      this.Hourd = this._APIService._AdsModel.Hourd;
      this.Minutes = this._APIService._AdsModel.Minutes;
      this.Minuted = this._APIService._AdsModel.Minuted;
      this.DefaultSelectClient = this.ClientName;
      this.DefaultSelectPlacement = this.PlaceHolderCode;

      this.SelectHour =  this.Hours;
      this.SelectHourd =  this.Hourd;
      this.SelectMinute = this.Minutes;
      this.SelectMinuted = this.Minuted;
    }
  }
  //#endregion

  //#region Update Operation
  UpdateAds() {
    if (this.FormDataImage != null) {
      this.ImageUpdate = this.FormDataImage;
    }
    else {
      this.ImageUpdate = this.ImagePath;
    }
    let result = this._APIService.UpdateAds(this.ImageUpdate, this.AdId, this.AdTitle, this.URL, this.PlaceHolderID, this.ClientName, this.Dates, this.Dated , this.SelectHour , this.SelectHourd ,this.SelectMinute , this.SelectMinuted ,  this.changeDate , this.changeDated).subscribe(
      data => { 
        this.CancelOperation();
        this.router.navigate(['/project/Advertisment']);
        this.UpdateAlert();
      },
      (err) => {
        this.UpdateAlert();
      });

      if(result == undefined)
      this.UpdateAlert();

  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;

    this.AdId = null;
    this.AdTitle = null;
    this.ImagePath = null;
    this.URL = null;
    this.Views = null;
    this.PlaceHolderID = null;
    this.ClientID = null;
    this.ClientName = null;
    this.PublishStartDate = null;
    this.PublishEndDate = null;
    this.PlaceHolderCode = null;
    this.imgURL = null;

    this._APIService._AdsModel.AdId = null;
    this._APIService._AdsModel.AdTitle = null;
    this._APIService._AdsModel.ImagePath = null;
    this._APIService._AdsModel.URL = null;
    this._APIService._AdsModel.Views = null;
    this._APIService._AdsModel.PlaceHolderID = null;
    this._APIService._AdsModel.ClientID = null;
    this._APIService._AdsModel.ClientName = null;
    this._APIService._AdsModel.PublishStartDate = null;
    this._APIService._AdsModel.PublishEndDate = null;
    this._APIService._AdsModel.PlaceHolderCode = null;


    this.DefaultSelectClient = "أختر عميل من القائمة";
    this.DefaultSelectPlacement = "أختر كود مكان الإعلان ";
    this.router.navigate(['/project/Advertisment']);

  }
  //#endregion

  //#region selected Category handler
  selectChangeHandler(event: any) {
    this.ClientName = event.target.value;
  }
  //#endregion 

  //#region selected Category handler
  selectChangeHandler2(event: any) {
    this.PlaceHolderID = event.target.value;
console.log()
  }
  //#endregion 

  //#region selected Hours handler
  selectChangeHandlerHour(event: any) {
    // this.TimeHour = event.target.value;
    this.SelectHour = event.target.value;
  }
  //#endregion

  //#region selected Minutes handler
  selectChangeHandlerMinute(event: any) {
    //this.TimeMinute = event.target.value;
    this.SelectMinute = event.target.value;
  }
  //#endregion

  //#region selected Hourd handler
  selectChangeHandlerHourd(event: any) {
    // this.TimeHour = event.target.value;
    this.SelectHourd = event.target.value;
  }
  //#endregion

  //#region selected Minuted handler
  selectChangeHandlerMinuted(event: any) {
    //this.TimeMinute = event.target.value;
    this.SelectMinuted = event.target.value;
  }
  //#endregion

  //#region Set  Start Date
  SetDates(event: any) {
    //this.EpisodePublishDate = event.target.value;
    // console.log("date is changed");
    this.changeDate = true;
  }
  //#endregion

  //#region Set  end Date
  SetDated(event: any) {
    //this.EpisodePublishDate = event.target.value;
    // console.log("date is changed");
    this.changeDated = true;
  }
  //#endregion

}
