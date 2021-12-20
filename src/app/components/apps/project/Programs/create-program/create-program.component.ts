import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { ProgramModel } from 'src/app/Models/program-model';
import * as _moment from 'moment';
import { ProgramInsert } from 'src/app/Models/program-insert';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss']
})
export class CreateProgramComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
      () => { this.EditProgram(); });

  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  Program: ProgramModel = this._APIService.Program;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;
  DefaultSelectCategory: any;
  DefaultSelectInterviewer: any;
  DefaultSelectProgramType: any;
  DefaultSelectType: string;
  DefaultSelectVisible: boolean;
  CategoryId: number;
  selectedCategory: string;
  selectedInterviewer: string;
  SelectHour: any;
  SelectMinute: any;
  _CategoryIDName: ObjectIDName[];
  _InterviewerIDName: ObjectIDName[];
  _TypeIDName: ObjectIDName[];
  CategoryID: number;
  CategoryName: string;
  InterviewerID: number;
  InterviewerName: string;
  ProgramTypeID: number;
  ProgramTypeName: string;
  ProgramID: number;
  ProgramOrder: number;
  ProgramName: string;
  ProgramVisible: boolean;
  ProgramDescription: string;
  ProgramImg: any;
  ProgramStartDate: any;
  changeDate:boolean = false;
  Date: string;
  ProgramPromoUrl:string;

  //#endregion

  //#region ngOnInit
  ngOnInit() {
    //#region Initialize Variables

    this.DefaultSelectCategory = "أختر تصنيف من القائمة";
    this.DefaultSelectInterviewer = "أختر محاور من القائمة";
    this.DefaultSelectType = "أختر نوع البرنامج من القائمة";
    this.SelectHour = "أختر الساعة ";
    this.SelectMinute = "أختر الدقيقة";
    this.DefaultSelectVisible = true;
    this.FlagUpdate = false;

    this.ProgramID = 0;
    this.ProgramName = "";
    this.ProgramStartDate =null;
    this.ProgramTypeID = 0;
    this.ProgramOrder = 0;
    this.ProgramVisible = true;
    this.CategoryID = 0;
    this.InterviewerID = 0;
    this.ProgramDescription = "";
    this.CategoryName = "";
    this.InterviewerName = "";
    this.ProgramTypeName = "";
    this.Date = "";

    //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        ProgramName: new FormControl('',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
        ProgramDescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10000)
          ]),
        InterviewerName: new FormControl('',
          [
            Validators.required
          ]),
        ProgramTypeName: new FormControl('',
          [
            Validators.required
          ]),
        CategoryName: new FormControl('',
          [
            Validators.required
          ]),
        ProgramOrder: new FormControl('',
          [
            Validators.required
          ]),
        // ProgramVisible: new FormControl('',
        //   [
        //     Validators.required
        //   ]),
        CategoryImage: new FormControl('',
          [
            Validators.required
          ]),
        // ProgramStartDate: new FormControl('',
        //   [
        //     Validators.required
        //   ]),
        ProgramPromoUrl: new FormControl('',
          [
            Validators.required
          ]),
          SelectHour: new FormControl('',
          [
            Validators.required
          ]),
          SelectMinute: new FormControl('',
          [
            Validators.required
          ]),
          Date: new FormControl('',
          [
            Validators.required
          ]),
      }
    );
    //#endregion

    //#region Start Functions
    this.EditProgram();
    this.CategoriesDropDown();
    this.InterviewerDropDown();
    this.ProgramTypesDropDown();
    //#endregion

  }
  //#endregion

  //#region Alerts
  InsertProgramAlert() {
    Swal.fire('تم إضافة البرنامج بنجاح  ')
  }

  InsertProgramAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }

  UpdateProgramAlert() {
    Swal.fire('تم تعديل البرنامج بنجاح  ')
  }
  //#endregion

  //#region Categories DropDown
  CategoriesDropDown() {
    this._APIService.CategoriesDropDown().subscribe(
      (data) => {
        this._CategoryIDName = data;
        this._CategoryIDName = this._CategoryIDName.filter(x => x.ID !== this._APIService.Program.CategoryId);
      },
      (err) => { }
    );
  }
  //#endregion

  //#region Interviewer DropDown
  InterviewerDropDown() {
    this._APIService.InterviewerDropDown().subscribe(
      (data) => {
        this._InterviewerIDName = data;
        this._InterviewerIDName = this._InterviewerIDName.filter(x => x.ID !== this._APIService.Program.InterviewerId);
      },
      (err) => { }
    );
  }
  //#endregion

  //#region ProgramTypes DropDown
  ProgramTypesDropDown() {
    this._APIService.ProgramTypesDropDown().subscribe(
      (data) => {
        this._TypeIDName = data;
        this._TypeIDName = this._TypeIDName.filter(x => x.ID !== this._APIService.Program.ProgramTypeId)
      },
      (err) => { }
    );
  }
  //#endregion

  //#region Call Create Program API -------
  InsertProgram() {

    let Name = this.RegisterForm.controls.ProgramName.value;
    let Order = this.RegisterForm.controls.ProgramOrder.value;
    let Visible = this.ProgramVisible;
    let Type = this.RegisterForm.controls.ProgramTypeName.value;
    let InterviewerName = this.RegisterForm.controls.InterviewerName.value;
    let CategoryName = this.RegisterForm.controls.CategoryName.value;
    let PromoUrl = this.RegisterForm.controls.ProgramPromoUrl.value;
    this.FormDataImage.append('Description', this.RegisterForm.controls.ProgramDescription.value);

    let Result = this._APIService.CreateProgram(this.FormDataImage, Name, Visible, Order, Type, InterviewerName, CategoryName, PromoUrl, this.Date, this.SelectHour, this.SelectMinute).
      subscribe(data => {
        this.InsertProgramAlert()
        this.router.navigate(['project/Programs']);
      }, (err) => {
        this.InsertProgramAlertError();
      });

    if (Result == undefined) {
      this.InsertProgramAlertError();
    }
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

    this.FormDataImage.append('ProgramImage', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditProgram() {
    if (this._APIService.Program.ProgramDescription != null) {
      this.FlagUpdate = true;

      this.ProgramID = this._APIService.Program.ProgramId;
      this.ProgramName = this._APIService.Program.ProgramName;
      this.ProgramStartDate = this._APIService.Program.ProgramStartDate;
      this.ProgramImg = this._APIService.URL + this._APIService.Program.ProgramImg;
      this.ProgramTypeID = this._APIService.Program.ProgramTypeId;
      this.ProgramOrder = this._APIService.Program.ProgramOrder;
      this.ProgramVisible = this._APIService.Program.ProgramVisible;
      this.CategoryID = this._APIService.Program.CategoryId;
      this.InterviewerID = this._APIService.Program.InterviewerId;
      this.ProgramDescription = this._APIService.Program.ProgramDescription;
      this.CategoryName = this._APIService.Program.CategoryName;
      this.InterviewerName = this._APIService.Program.InterviewerName;
      this.ProgramTypeName = this._APIService.Program.ProgramTypeName;
      // this.Hour = this._APIService.Program.Hour;
      // this.Minute = this._APIService.Program.Minute;
      this.Date = this._APIService.Program.Date;
      this.SelectHour = this._APIService.Program.Hour;
      this.SelectMinute = this._APIService.Program.Minute;
      this.ProgramPromoUrl = this._APIService.Program.ProgramPromoUrl;


      this.DefaultSelectCategory = this.CategoryName;
      this.DefaultSelectInterviewer = this.InterviewerName;
      this.DefaultSelectType = this.ProgramTypeName;
      this.DefaultSelectVisible = this.ProgramVisible;
      // this.SelectHour = this.Hour;
      // this.SelectMinute = this.Minute;
    }
  }
  //#endregion

  //#region Update Operation
  UpdateProgram() {
    if (this.FormDataImage != null) {
      this.ImageUpdate = this.FormDataImage;
    }
    else {
      this.ImageUpdate = this.ProgramImg;
    }
    // this.TimeHour = this.RegisterForm.controls.
    this.FormDataImage.append('Description',  this.ProgramDescription);

    let Result = this._APIService.UpdateProgram(
                                                this.ImageUpdate  , 
                                                this.ProgramID, 
                                                this.ProgramName, 
                                                this.Date, 
                                                this.ProgramTypeID, 
                                                this.ProgramOrder, 
                                                this.ProgramVisible, 
                                                this.CategoryID, 
                                                this.InterviewerID, 
                                                this.SelectHour, 
                                                this.SelectMinute , 
                                                this.changeDate).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigate(['/project/Programs']);
        this.UpdateProgramAlert();
      },
      (err) => {
      });

      if (Result == undefined) { this.InsertProgramAlertError();}
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;
    this.ProgramID = null;
    this.ProgramName = null;
    this.ProgramStartDate = null;
    this.ProgramImg = null;
    this.ProgramTypeID = null;
    this.ProgramOrder = null;
    this.ProgramVisible = true;
    this.CategoryID = null;
    this.InterviewerID = null;
    this.ProgramDescription = null;
    this.CategoryName = null;
    this.InterviewerName = null;
    this.ProgramTypeName = null;
    this.imgURL = null;
    this.Date = null;
    // this.Hour = null;
    // this.Minute = null;

    this._APIService.Program.ProgramId = null;
    this._APIService.Program.ProgramName = null;
    this._APIService.Program.ProgramStartDate = null;
    this._APIService.Program.ProgramImg = null;
    this._APIService.Program.ProgramTypeId = null;
    this._APIService.Program.ProgramOrder = null;
    this._APIService.Program.ProgramVisible = null;
    this._APIService.Program.CategoryId = null;
    this._APIService.Program.InterviewerId = null;
    this._APIService.Program.ProgramDescription = null;
    this._APIService.Program.CategoryName = null;
    this._APIService.Program.InterviewerName = null;
    this._APIService.Program.ProgramTypeName = null;
    this._APIService.Program.Hour = null;
    this._APIService.Program.Minute = null;
    this._APIService.Program.Date = null;

    this.DefaultSelectCategory = "أختر تصنيف من القائمة";
    this.DefaultSelectInterviewer = "أختر محاور من القائمة";
    this.DefaultSelectType = "أختر نوع البرنامج من القائمة";
    this.SelectHour = "أختر الساعة ";
    this.SelectMinute = "أختر الدقيقة";
    this.DefaultSelectVisible = true;

    this.router.navigate(['project/Programs']);

  }
  //#endregion

  //#region selected Category handler
  selectChangeHandlerInterviewer(event: any) {
    if(this.DefaultSelectInterviewer !='n')
     this.InterviewerID = event.target.value;
  }
  //#endregion 

    //#region selected Category handler
    selectChangeHandlerCategory(event: any) {
      if(this.DefaultSelectCategory !='n')
      this.CategoryID = event.target.value;
    }
    //#endregion 

  //#region selected Hour handler
  selectChangeHandlerHour(event: any) {
   // this.TimeHour = event.target.value;
    this.SelectHour = event.target.value;
  }
  //#endregion

  //#region selected Minute handler
  selectChangeHandlerProgramType(event: any) {
    //this.TimeMinute = event.target.value;
    if(this.DefaultSelectType !='n' )
    this.ProgramTypeID = event.target.value;
  }
  //#endregion 

   //#region selected Minute handler
   selectChangeHandlerMinute(event: any) {
    //this.TimeMinute = event.target.value;
    this.SelectMinute = event.target.value;
  }
  //#endregion 

  //#region selected select Change Handler Visible
  selectChangeHandlerVisible(event: any) {
    //this.CategoryVisible = event.target.value;
    var element = <HTMLInputElement>document.getElementById("checkbox1");
    this.ProgramVisible = element.checked;
    // console.log(" this.ProgramVisible : ", this.ProgramVisible)
  }
  //#endregion

  //#region Set  Start Date
    SetDate(event: any) {
      //this.EpisodePublishDate = event.target.value;
      console.log("date is changed");
      this.changeDate = true;
    }
    //#endregion

}
