import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { InterviewerModel } from 'src/app/Models/interviewer-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-interviewer',
  templateUrl: './create-interviewer.component.html',
  styleUrls: ['./create-interviewer.component.scss']
})
export class CreateInterviewerComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
      () => { this.EditInterviewer(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  Interviewer: InterviewerModel = this._APIService._InterviewerModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;
  ImageUpdate2: any;

  InterviewerId: number;
  InterviewerName: string;
  InterviewerPicture: string;
  InterviewerCover: string;
  InterviewerDescription: string;
  FacebookUrl: string;
  InstgramUrl: string;
  TwitterUrl: string;
  YoutubeUrl: string;
  LinkedInUrl: string;
  WebsiteUrl: string;
  CreationDate: string;
  BirthDate: string;
  TiktokUrl: string;
  Date:string;
  changeDate:boolean = false;



  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Initialize Variables

    this.FlagUpdate = false;

    this.InterviewerId = null;
    this.InterviewerName = null;
    this.InterviewerPicture = null;
    this.InterviewerCover = null;
    this.InterviewerDescription = null;
    this.FacebookUrl = null;
    this.InstgramUrl = null;
    this.TwitterUrl = null;
    this.YoutubeUrl = null;
    this.LinkedInUrl = null;
    this.WebsiteUrl = null;
    this.CreationDate = null;
    this.BirthDate = null;
    this.TiktokUrl = null;

    //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        InterviewerName: new FormControl('',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
        InterviewerDescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10000)
          ]),
        FacebookUrl: new FormControl('',
          [
            //Validators.required
          ]),
        InstgramUrl: new FormControl('',
          [
            Validators.nullValidator 
          ]),
        TwitterUrl: new FormControl('',
          [
            Validators.nullValidator
          ]),
        YoutubeUrl: new FormControl('',
          [
            Validators.nullValidator
          ]),
        LinkedInUrl: new FormControl('',
          [
            Validators.nullValidator
          ]),
        WebsiteUrl: new FormControl('',
          [
            Validators.nullValidator
          ]),
        BirthDate: new FormControl('',
          [
            Validators.required
          ]),
        TiktokUrl: new FormControl('',
          [
            Validators.nullValidator
          ]),
          InterviewerPicture: new FormControl('',
          [
            Validators.required
          ]),
          InterviewerCover: new FormControl('',
          [
            Validators.required
          ]),
      }
    );
    //#endregion


    //#region Start Functions
    this.EditInterviewer(); 
    //#endregion

  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة المذيع بنجاح  ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل المذيع بنجاح  ')
  }
  //#endregion

  //#region Set Interviewer Start Date
  SetDate(event:any) {
    this.Date = event.target.value;
    this.changeDate = true;
  }
  //#endregion

  //#region Call Create Interviewer API -------
  CreateInterviewer() {
    this.FormDataImage.append('Description', this.InterviewerDescription);
    this._APIService.CreateInterviewer(this.FormDataImage, this.InterviewerName, this.FacebookUrl, this.InstgramUrl, this.TwitterUrl, this.YoutubeUrl, this.LinkedInUrl, this.WebsiteUrl, this.Date, this.TiktokUrl).
      subscribe(data => {
        this.router.navigate(['/project/Interviewers']);
        this.InsertAlert();
      }, (err) => {
        this.InsertAlertError();
      });
  }
  //#endregion

  //#region review AND File FormData interviewer picture from input file
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
    this.FormDataImage.append('InterviewerIamge', files[0]);
  }
  //#endregion

  //#region review 2 AND File FormData Interviewer cover from input file
  public imagePath2;
  imgURL2: any;
  public message2: string;

  preview2(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message2 = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath2 = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL2 = reader.result;
    }
        this.FormDataImage.append('InterviewerCover', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditInterviewer() {
    if (this._APIService._InterviewerModel.InterviewerName != null)
     {
        this.FlagUpdate = true;
        this.InterviewerId          = this._APIService._InterviewerModel.InterviewerId;
        this.InterviewerName        = this._APIService._InterviewerModel.InterviewerName;
        this.InterviewerPicture     = this._APIService.URL+this._APIService._InterviewerModel.InterviewerPicture;
        this.InterviewerCover       = this._APIService.URL+this._APIService._InterviewerModel.InterviewerCover;
        this.InterviewerDescription = this._APIService._InterviewerModel.InterviewerDescription;
        this.FacebookUrl            = this._APIService._InterviewerModel.FacebookUrl;
        this.InstgramUrl            = this._APIService._InterviewerModel.InstgramUrl;
        this.TwitterUrl             = this._APIService._InterviewerModel.TwitterUrl;
        this.YoutubeUrl             = this._APIService._InterviewerModel.YoutubeUrl;
        this.LinkedInUrl            = this._APIService._InterviewerModel.LinkedInUrl;
        this.WebsiteUrl             = this._APIService._InterviewerModel.WebsiteUrl;
        this.BirthDate              = this._APIService._InterviewerModel.BirthDate;
        this.TiktokUrl              = this._APIService._InterviewerModel.TiktokUrl;
        this.Date                   = this._APIService._InterviewerModel.Date;
    }
  }
  //#endregion

  //#region Update Operation
  UpdateInterviewer()
   {
    this.FormDataImage.append('Description', this.InterviewerDescription);
    this._APIService.UpdateInterviewer(this.FormDataImage ,this.InterviewerId ,  this.InterviewerName, this.FacebookUrl, this.InstgramUrl, this.TwitterUrl, this.YoutubeUrl, this.LinkedInUrl, this.WebsiteUrl, this.Date, this.TiktokUrl , this.changeDate).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigate(['/project/Interviewers']);
        this.UpdateAlert();
      },
      (err) => {
      });
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;

    this.InterviewerId = null;
    this.InterviewerName = null;
    this.InterviewerPicture = null;
    this.InterviewerCover = null;
    this.InterviewerDescription = null;
    this.FacebookUrl = null;
    this.InstgramUrl = null;
    this.TwitterUrl = null;
    this.YoutubeUrl = null;
    this.LinkedInUrl = null;
    this.WebsiteUrl = null;
    this.CreationDate = null;
    this.BirthDate = null;
    this.TiktokUrl = null;

    this._APIService._InterviewerModel.InterviewerName          =null;
    this._APIService._InterviewerModel.InterviewerPicture       =null;
    this._APIService._InterviewerModel.InterviewerCover         =null;
    this._APIService._InterviewerModel.InterviewerDescription   =null;
    this._APIService._InterviewerModel.FacebookUrl              =null;
    this._APIService._InterviewerModel.InstgramUrl              =null;
    this._APIService._InterviewerModel.TwitterUrl               =null;
    this._APIService._InterviewerModel.YoutubeUrl               =null;
    this._APIService._InterviewerModel.LinkedInUrl              =null;
    this._APIService._InterviewerModel.WebsiteUrl               =null;
    this._APIService._InterviewerModel.BirthDate                =null;
    this._APIService._InterviewerModel.TiktokUrl                =null;

    this.router.navigate(['/project/Interviewers']);

  }
  //#endregion


}
