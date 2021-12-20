import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { ProgramTypeModel } from 'src/app/Models/program-type-model';
import { Slider } from 'src/app/Models/Slider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slider-update',
  templateUrl: './slider-update.component.html',
  styleUrls: ['./slider-update.component.scss']
})
export class SliderUpdateComponent implements OnInit {

  //#region Constructor
  constructor(private _APIService: APIService, private router: Router) {
    this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
      () => { this.EditProgramType(); });
  }
  //#endregion

  //#region Declare Varaibles
  RegisterForm: FormGroup;
  FormDataImage: FormData = new FormData();
  slider: Slider = this._APIService.slider;
  SliderId: number;
  SliderTitle: string;
  EpisodeId: number;
  ImageForWeb: string;
  SliderImagePath: string;
  clickEventSuscriptionCat: Subscription;
  FlagUpdate: boolean;
  ImageUpdate: any;

  DefaultSelectepisode: string ;
  _EpisodeIDName: ObjectIDName[];

  //#endregion

  //#region ngOnInit
  ngOnInit() {

    //#region Init Values
    this.SliderId = -1;
    this.SliderTitle = "";
    this.EpisodeId = -1;
    this.ImageForWeb = "";
    this.SliderImagePath = "";
    //#endregion



    this.RegisterForm = new FormGroup({
      SliderTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      // ProgramTypeImg: new FormControl('', [
      //   Validators.required]),
      SliderImagePath: new FormControl('', [
        Validators.required]),
      ImageForWeb: new FormControl('', [
        Validators.required]),
      EpisodeId: new FormControl('', [
        Validators.required]),
    });

    this.FlagUpdate = false;
    this.EditProgramType();
    this.EpisodeRelatedDropDown();
  }
  //#endregion

  //#region Alerts

  InsertAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى  ')
  }

  UpdateAlert() {
    Swal.fire('تم تعديل السلايدر  بنجاح  ')
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

    this.FormDataImage.append('SliderImagePath', files[0]);
  }
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

    this.FormDataImage.append('ImageForWeb', files[0]);
  }
  //#endregion

  //#region Edit Operation
  EditProgramType() {

    if (this._APIService.slider.SliderTitle != null) {
      this.FlagUpdate = true;
      this.SliderId = this._APIService.slider.SliderId;
      this.SliderTitle = this._APIService.slider.SliderTitle;
      this.EpisodeId = this._APIService.slider.EpisodeId;
      this.ImageForWeb = this._APIService.URL + this._APIService.slider.ImageForWeb;
      this.SliderImagePath = this._APIService.URL + this._APIService.slider.SliderImagePath;
      this.DefaultSelectepisode = this._APIService.slider.EpisodeTitle;
    }
  }
  //#endregion

  //#region Update Operation
  UpdateProgramType() {

    this._APIService.EditSlider(this.FormDataImage, this.SliderId, this.SliderTitle,this.EpisodeId).subscribe(
      data => {
        this.CancelOperation();
        this.router.navigateByUrl('project/Sliders');
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
    //this.SliderModel = null;
    this.imgURL = null;
    this.imgURL2 = null;

    this.slider = null;

    this.router.navigateByUrl('project/Sliders');
  }
  //#endregion

  //#region selected Episode handler
  selectChangeHandlerEpisode(event: any) {
    this.EpisodeId = event.target.value;
  }
  //#endregion

  //#region Episode DropDown
  EpisodeRelatedDropDown() {
    let res = this._APIService.EpisodeDropDown().subscribe(
      (data) => {
         this._EpisodeIDName = data; 
         this.DefaultSelectepisode = this._APIService.slider.EpisodeTitle;         
        },
      (err) => { }
    );

  }
  //#endregion
}
