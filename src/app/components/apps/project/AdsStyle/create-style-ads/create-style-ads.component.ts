import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { StyleModel } from 'src/app/Models/style-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-style-ads',
  templateUrl: './create-style-ads.component.html',
  styleUrls: ['./create-style-ads.component.scss']
})
export class CreateStyleAdsComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
      () => { this.EditStyle(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  _StyleModel: StyleModel = this._APIService._StyleModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  // ImageUpdate: any;

  ADStyleId: number;
  ADStyleTitle: string;
  ADWidth: number;
  ADHeight: number;

  //#endregion

  //#region ngOnInit
  ngOnInit() {
    this.RegisterForm = new FormGroup(
      {
        ADStyleTitle: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)]),
        ADWidth: new FormControl('', [
          Validators.required],
        ),
        ADHeight: new FormControl('', [
          Validators.required])
      });

    this.FlagUpdate = false;
    this.EditStyle();
  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة الأبعاد بنجاح   ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى  ')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل الموسم  بنجاح  ')
  }
  //#endregion

  //#region Invoke Insert Style  API -------
  InsertStyle() {

    this._APIService.InsertStyle(this.ADStyleTitle, this.ADWidth, this.ADHeight).subscribe(
      data => {
        this.router.navigateByUrl('project/Style');
        this.InsertAlert();
      },
      (err) => {
        this.InsertAlertError();

      });
  }
  //#endregion

  //#region Edit Operation
  EditStyle() {

    if (this._APIService._StyleModel.ADStyleTitle != null) {

      this.FlagUpdate = true;
      this.ADStyleId = this._APIService._StyleModel.ADStyleId;
      this.ADStyleTitle = this._APIService._StyleModel.ADStyleTitle;
      this.ADWidth = this._APIService._StyleModel.ADWidth;
      this.ADHeight = this._APIService._StyleModel.ADHeight;

    }
  }
  //#endregion

  //#region Update Operation
  UpdateStyle() {
    this._APIService.UpdateStyle(this.ADStyleId, this.ADStyleTitle, this.ADWidth, this.ADHeight).subscribe(
      data => {
        this.router.navigateByUrl('project/Style');
        this.UpdateAlert();
      },
      (err) => {
        this.InsertAlertError();

      });
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;

    this.ADStyleId = null;
    this.ADStyleTitle = null;
    this.ADWidth = null;
    this.ADHeight = null;

    this._APIService._StyleModel.ADStyleId = null;
    this._APIService._StyleModel.ADStyleTitle = null;
    this._APIService._StyleModel.ADWidth = null;
    this._APIService._StyleModel.ADHeight = null;
    this.router.navigateByUrl('project/Style');
  }
  //#endregion


}
