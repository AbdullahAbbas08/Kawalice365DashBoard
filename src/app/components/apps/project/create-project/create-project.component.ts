import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APIService } from 'src/app/ApiServices/api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Models/category';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

    //#region Constructor
    constructor(private _APIService:APIService ,private router:Router)
    {
    this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
      ()=>{this.EditCategory(); });
    }
    //#endregion

    //#region Declare Varaibles
      RegisterForm:FormGroup;
      FormDataImage: FormData = new FormData();
      category : Category = this._APIService.Category ;
      clickEventSuscriptionCat : Subscription;
      FlagUpdate : boolean;
      ImageUpdate : any;

    CategoryId          :number;      
    CategoryDescription :string;
    CategoryOrder       :number;
    CategoryTitle       :string;
    CategoryViews       :number;
    CategoryImg         :string;
    CategoryVisible     :boolean = true;
    //#endregion

    //#region ngOnInit
    ngOnInit() {

      this.RegisterForm= new FormGroup({
        CategoryTitle: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)]),
          CategoryDescription: new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10000)]),
          CategoryOrder: new FormControl('', [
          Validators.required]),
          // CategoryVisible: new FormControl('', [
          //   Validators.required]),
          CategoryImage: new FormControl('', [
          Validators.required]),
          // CategoryView: new FormControl('', [
          //   Validators.required]),
      });

      this.FlagUpdate = false;
      this.EditCategory();
    }
    //#endregion

    //#region Alerts

    InsertAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
    }
    InsertAlert() {
      Swal.fire('تم إضافة التصنيف بنجاح   ')
    }
    
    UpdateAlert() {
      Swal.fire('تم تعديل التصنيف بنجاح  ')
    }
    //#endregion

    //#region Invoke InsertCategory API -------
      InsertCategory()
      {
        let Title = this.RegisterForm.controls.CategoryTitle.value;
        let Order = this.RegisterForm.controls.CategoryOrder.value;
        let Visible = this.CategoryVisible;
        this.FormDataImage.append('Description',this.RegisterForm.controls.CategoryDescription.value);

        
        this._APIService.CreateCategory( this.FormDataImage , Title  ,Visible , Order   ).subscribe(
          data=>
          {
            this.router.navigateByUrl('project/list');
            this.InsertAlert();
          },
            (err)=>{
              this.InsertAlertError();
            });
      }
      //#endregion

    //#region review AND File FormData image from input file
      public imagePath;
      imgURL: any;
      public message: string;
    
      preview(files) 
      {
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

          this.FormDataImage.append('CategoryImage',files[0]);
      }
      //#endregion

    //#region Edit Operation
    EditCategory()
    {

      if(this._APIService.Category.CategoryDescription !=null )
      {
        this.FlagUpdate = true;
        this.CategoryId          = this._APIService.Category.CategoryId;
        this.CategoryDescription = this._APIService.Category.CategoryDescription;
        this.CategoryOrder       = this._APIService.Category.CategoryOrder;
        this.CategoryTitle       = this._APIService.Category.CategoryTitle;
        this.CategoryViews       = this._APIService.Category.CategoryViews;
        this.CategoryImg         = this._APIService.URL+this._APIService.Category.CategoryImg;
        this.CategoryVisible     = this._APIService.Category.CategoryVisible;
      
      }
    }
    //#endregion

    //#region Update Operation
    UpdateCategory()
    {
      if( this.FormDataImage != null)
      {
        this.ImageUpdate = this.FormDataImage;
      }
      else 
      {
        this.ImageUpdate =  this.CategoryImg;
      }
      
      this.FormDataImage.append('Description',this.CategoryDescription);
      this._APIService.EditCategory( this.ImageUpdate ,this.CategoryId, this.CategoryTitle ,this.CategoryVisible , this.CategoryOrder , this.CategoryViews  ).subscribe(
        data=>
        {
          this.CancelOperation();
          this.router.navigateByUrl('project/list');
          this.UpdateAlert();
        },
          (err)=>{
            this.InsertAlertError();
          });
    }
    //#endregion

    //#region Cancel Operation
    CancelOperation()
    {
      
      this.FlagUpdate = false;
      this.CategoryId          = null;
      this.CategoryDescription = null;
      this.CategoryOrder       = null;
      this.CategoryTitle       = null;
      this.CategoryViews       = null;
      this.CategoryImg         = null;
      this.CategoryVisible     = false;
      this.imgURL              = null;

      this._APIService.Category.CategoryId = null;
      this._APIService.Category.CategoryDescription = null;
      this._APIService.Category.CategoryOrder = null;
      this._APIService.Category.CategoryTitle = null;
      this._APIService.Category.CategoryViews = null;
      this._APIService.Category.CategoryImg = null;
      this._APIService.Category.CategoryVisible = null;
      this.router.navigateByUrl('project/list');
    }
    //#endregion

       //#region selected select Change Handler Visible
       selectChangeHandlerVisible (event: any) {
        //this.CategoryVisible = event.target.value;
        var element = <HTMLInputElement> document.getElementById("checkbox1");
        this.CategoryVisible = element.checked;
      }
      //#endregion
}

