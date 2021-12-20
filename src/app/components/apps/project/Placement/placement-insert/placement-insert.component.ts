import { Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { PlacementModel } from 'src/app/Models/placement-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-placement-insert',
  templateUrl: './placement-insert.component.html',
  styleUrls: ['./placement-insert.component.scss']
})
export class PlacementInsertComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEventProgram().subscribe(
      () => { this.EditPlacement(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  _PlacementModel: PlacementModel = this._APIService._PlacementModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;
  DefaultSelectStyle: string ;
  DefaultSelectTarget: string;
  _StyleTitle: string;
  _TargetTitle: string;
  _StyleIDName: ObjectIDName[];
  _TargetIDName: ObjectIDName[];
  ADPlaceholderID: number;
  ADPlaceholderCode: number;
  AdStyleID: number;
  AdTargetId: number;
  Title: string;
  ImagePath: string;
  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Initialize Variables
    this.DefaultSelectStyle = "أختر عنوان الابعاد من القائمة";
    this.DefaultSelectTarget = "أختر تارجت من القائمة";
    this.FlagUpdate = false;
    this.ADPlaceholderID = null;
    this.ADPlaceholderCode = null;
    this.AdStyleID = null;
    this.AdTargetId = null;
    this.Title = null;
    this.ImagePath = null;
    //#endregion

    //#region Init Form Group -- Register Form
    this.RegisterForm = new FormGroup(
      {
        Title: new FormControl('',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]),
        ADPlaceholderCode: new FormControl('',
          [
            Validators.required
          ]),
        AdStyleID: new FormControl('',
          [
            Validators.required
          ]),
        AdTargetId: new FormControl('',
          [
            Validators.required
          ]),
        ImagePath: new FormControl('',
          [
            Validators.required
          ]),
      }
    );
    //#endregion

    //#region Start Functions
    this.StyleDropDown();
    this.TargetDropDown();
    this.EditPlacement();
    //#endregion
  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة مكان إعلان بنجاح  ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل مكان الاعلان بنجاح  ')
  }
  //#endregion

  //#region Style DropDown
  StyleDropDown() {
    this._APIService.StyleDropDown().subscribe(
      (data) => {
        this._StyleIDName = data;
        this._StyleIDName = this._StyleIDName.filter(x => x.ID !== this._APIService._PlacementModel.AdStyleID);
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Target DropDown
  TargetDropDown() {
    this._APIService.TargetDropDown().subscribe(
      (data) => {
        this._TargetIDName = data;
        this._TargetIDName = this._TargetIDName.filter(x => x.ID !== this._APIService._PlacementModel.AdTargetId);
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Call Create Placement API -------
  CreatePlacement() {
    this._APIService.InsertPlacement(this.FormDataImage, this.ADPlaceholderCode, this._TargetTitle, this._StyleTitle, this.Title).
      subscribe(data => {
        this.InsertAlert()
        this.router.navigate(['project/Placement']);
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
    this.FormDataImage.append('PlacementIamge', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditPlacement() {
    if (this._APIService._PlacementModel.ADPlaceholderID != null) {

      this.FlagUpdate = true;

      this.ADPlaceholderID = this._APIService._PlacementModel.ADPlaceholderID;
      this.ADPlaceholderCode = this._APIService._PlacementModel.ADPlaceholderCode;
      this.AdStyleID = this._APIService._PlacementModel.AdStyleID;
      this.AdTargetId = this._APIService._PlacementModel.AdTargetId;
      this.Title = this._APIService._PlacementModel.Title;
      this.ImagePath = this._APIService.URL + this._APIService._PlacementModel.ImagePath;

      this.DefaultSelectStyle = this._APIService._PlacementModel.ADStyleTitle;
      this.DefaultSelectTarget =  this._APIService._PlacementModel.ADTargetTitle;

    }
  }
  //#endregion

  //#region Update Operation
  UpdatePlacement() {
    if (this.FormDataImage != null) {
      this.ImageUpdate = this.FormDataImage;
    }
    else {
      this.ImageUpdate = this.ImagePath;
    }

    this._APIService.UpdatePlacement(this.ImageUpdate, this.ADPlaceholderID, this.ADPlaceholderCode, this.AdTargetId, this.AdStyleID, this.Title).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigate(['/project/Placement']);
        this.UpdateAlert();
      },
      (err) => {
      });
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;

    this.ADPlaceholderID = null;
    this.ADPlaceholderCode = null;
    this.AdStyleID = null;
    this.AdTargetId = null;
    this.Title = null;
    this.ImagePath = null;

    this._APIService._PlacementModel.ADPlaceholderID = null;
    this._APIService._PlacementModel.ADPlaceholderCode = null;
    this._APIService._PlacementModel.AdStyleID = null;
    this._APIService._PlacementModel.AdTargetId = null;
    this._APIService._PlacementModel.ImagePath = null;
    this._APIService._PlacementModel.Title = null;

    this.DefaultSelectStyle = "أختر عنوان الابعاد من القائمة";
    this.DefaultSelectTarget = "أختر تارجت من القائمة";
  }
  //#endregion

  //#region selected Style handler
  selectChangeHandlerStyle(event: any) {
    this.AdStyleID = event.target.value;
  }
  //#endregion

  //#region selected Target handler
  selectChangeHandlerTarget(event: any) {
    this.AdTargetId = event.target.value;
  }
  //#endregion
 
}
