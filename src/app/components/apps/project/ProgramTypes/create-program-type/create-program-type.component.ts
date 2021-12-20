import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { ProgramTypeModel } from 'src/app/Models/program-type-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-program-type',
  templateUrl: './create-program-type.component.html',
  styleUrls: ['./create-program-type.component.scss']
})
export class CreateProgramTypeComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
      () => { this.EditProgramType(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  ProgramType: ProgramTypeModel = this._APIService.ProgramType;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;

  ProgramTypeId: number;
  ProgramTypeOrder: number;
  ProgramTypeTitle: string;
  ProgramTypeImg: string;
  //#endregion

  //#region ngOnInit
  ngOnInit() {

    this.RegisterForm = new FormGroup({
      ProgramTypeTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      ProgramTypeImg: new FormControl('', [
        Validators.required]),
      ProgramTypeOrder: new FormControl('', [
        Validators.required]),
    });

    this.FlagUpdate = false;
    this.EditProgramType();
  }
  //#endregion

  //#region Alerts
  InsertAlert() {
    Swal.fire('تم إضافة نوع البرنامج بنجاح وسيتم  ')
  }

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى  ')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل نوع البرنامج  بنجاح  ')
  }
  //#endregion

  //#region Invoke Insert Program Type API -------
  InsertProgramType() {
    let Title = this.RegisterForm.controls.ProgramTypeTitle.value;
    let Order = this.RegisterForm.controls.ProgramTypeOrder.value;


    this._APIService.InsertProgramType(this.FormDataImage, Title, Order).subscribe(
      data => {
        this.router.navigateByUrl('project/ProgramTypes');
        this.InsertAlert();
      },
      (err) => {
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

    this.FormDataImage.append('ProgramTypeImage', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditProgramType() {

    if (this._APIService.ProgramType.ProgramTypeTitle != null) {
      this.FlagUpdate = true;

      this.ProgramTypeId = this._APIService.ProgramType.ProgramTypeId;
      this.ProgramTypeOrder = this._APIService.ProgramType.ProgramTypeOrder;
      this.ProgramTypeTitle = this._APIService.ProgramType.ProgramTypeTitle;
      this.ProgramTypeImg = this._APIService.URL + this._APIService.ProgramType.ProgramTypeImgPath;
    }
  }
  //#endregion

  //#region Update Operation
  UpdateProgramType() {
    if (this.FormDataImage != null) {
      this.ImageUpdate = this.FormDataImage;
    }
    else {
      this.ImageUpdate = this.ProgramTypeImg;
    }


    this._APIService.EditProgramType(this.ImageUpdate, this.ProgramTypeId, this.ProgramTypeTitle, this.ProgramTypeOrder).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigateByUrl('project/ProgramTypes');
        this.UpdateAlert()
      },
      (err) => {
        this.InsertAlertError();

      });
  }
  //#endregion

  //#region Cancel Operation
  CancelOperation() {

    this.FlagUpdate = false;
    this.ProgramTypeId = null;
    this.ProgramTypeTitle = null;
    this.ProgramTypeOrder = null;
    this.ProgramTypeImg = null;
    this.imgURL = null;

    this._APIService.ProgramType.ProgramTypeId = null;
    this._APIService.ProgramType.ProgramTypeTitle = null;
    this._APIService.ProgramType.ProgramTypeOrder = null;
    this._APIService.ProgramType.ProgramTypeImgPath = null;
   
    this.router.navigateByUrl('project/ProgramTypes');
  }
  //#endregion


}
