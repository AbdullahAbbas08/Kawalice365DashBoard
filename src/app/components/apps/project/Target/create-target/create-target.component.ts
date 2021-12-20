import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { TargetModel } from 'src/app/Models/target-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-target',
  templateUrl: './create-target.component.html',
  styleUrls: ['./create-target.component.scss']
})
export class CreateTargetComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
      () => { this.EditTarget(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  _TargetModel: TargetModel = this._APIService._TargetModel;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ADTargetID: number;
  ADTargetTitle: string;
  ADTargetType: string;
  ItemID: number;
  //#endregion

  //#region ngOnInit
  ngOnInit() {
    this.RegisterForm = new FormGroup(
      {
        ADTargetTitle: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)]),
          ADTargetType: new FormControl('', [
            Validators.required],
            ),
            ItemID: new FormControl('', [
                Validators.required],)
    });

    this.FlagUpdate = false;
    this.EditTarget();
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

  //#region Invoke Insert Target Type API -------
  InsertTarget() {
   
    this._APIService.InsertTarget( this.ADTargetTitle,this.ADTargetType ,this.ItemID ).subscribe(
      data => {
        this.router.navigateByUrl('project/Target');
        this.InsertAlert();
      },
      (err) => {
        this.InsertAlertError();

      });
  }
  //#endregion

  //#region Edit Operation
  EditTarget() {

    if (this._APIService._TargetModel.ADTargetTitle != null) {
      this.FlagUpdate = true;

      this.ADTargetID   =this._APIService._TargetModel.ADTargetID;
      this.ADTargetTitle =this._APIService._TargetModel.ADTargetTitle;
      this.ADTargetType =this._APIService._TargetModel.ADTargetType;
      this.ItemID       =this._APIService._TargetModel.ItemID;

    }
  }
  //#endregion

  //#region Update Operation
  UpdateTarget() {
    this._APIService.UpdateTarget( this.ADTargetID ,  this.ADTargetTitle,this.ADTargetType, this.ItemID ).subscribe(
      data => {
        this.router.navigateByUrl('project/Target');
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

    this.ADTargetID   =null;
    this.ADTargetTitle =null;
    this.ADTargetType =null;
    this.ItemID       =null;

    this._APIService._TargetModel.ADTargetID      =null;
    this._APIService._TargetModel.ADTargetTitle    =null;
    this._APIService._TargetModel.ADTargetType    =null;
    this._APIService._TargetModel.ItemID          =null;
    this.router.navigateByUrl('project/Target');

  }
  //#endregion


}
