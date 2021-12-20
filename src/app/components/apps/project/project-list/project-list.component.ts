import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category';
import { CollectionData } from 'src/app/Models/collection-data';
import {APIService} from '../../../../ApiServices/api.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/components/apps/project/dialog-example/dialog-example.component';
import { Router } from '@angular/router';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

    //#region Constructor
    constructor(public _APIService:APIService ,
      public Dialog:MatDialog , 
      private router: Router){}
    //#endregion

    //#region Declare Variables
    Category_Url : CollectionData<Category>;
    CategoryList : Category[];
    CategoryListFiltered : Category[];
    selectedCategory: string = "أختر تصنيف من القائمة";
    _CategoryIDName: ObjectIDName[];
    DefaultSelectCategory: string;

    //#endregion

    //#region On Init
    ngOnInit() {
      this.DefaultSelectCategory = "أختر تصنيف من القائمة";
      this.getCategory();  
      this.CategoriesDropDown(); 
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

    //#region Get Categories
    getCategory()
    {
      this._APIService.GetCategories().subscribe(
        (data)=>
        {
          this.Category_Url = data;
          this.CategoryList = this.Category_Url.DataList;
          this.CategoryListFiltered = this.CategoryList;
        },
        (err)=>{}
      );
    }
    //#endregion
    
    //#region Alerts
    GeneralErrorMessege() {
      Swal.fire(' حدث خطأ فى إيجاد البيانات برجاء المحاولة مرة أخرى')
    }
    DeleteAlerterr() {
      Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
    }
    DeleteCategoryAlert() {
      Swal.fire('تم حذف التصنيف بنجاح  ')
    }
    //#endregion
    //#region open Dialog
    openDialog(DataTitle : string , ID:number): void 
      {
        let type = 'تصنيف';
        let DialogRef =   this.Dialog.open(DialogExampleComponent , {data:{type:type,name:DataTitle,ID:ID , flag:1}});
          DialogRef.afterClosed().subscribe(result=>{
          if(result =='true')
          {
            let result = this._APIService.DeleteCategory(ID).subscribe(
              response=>{
               this.DeleteCategoryAlert()
               this.getCategory()
              },
              (err)=>{
            this.DeleteAlerterr();
              });
          //  this.CategoryListFiltered = this.CategoryListFiltered.filter(x=>x.CategoryId !== ID );
          if(result == undefined)
          this.GeneralErrorMessege();
          }
      });
      }
    //#endregion

    //#region Update Category
    UpdateCategory(
      _CategoryId : number,                          
      _CategoryTitle:string,                          
      _CategoryImg:string,                          
      _CategoryVisible:boolean,                          
      _CategoryOrder:number,                          
      _CategoryViews:number,                          
      _CategoryDescription:string )
        {

        this._APIService.Category.CategoryId = _CategoryId ;            
        this._APIService.Category.CategoryTitle = _CategoryTitle ;            
        this._APIService.Category.CategoryImg = _CategoryImg ;            
        this._APIService.Category.CategoryVisible = _CategoryVisible ;            
        this._APIService.Category.CategoryOrder = _CategoryOrder ;            
        this._APIService.Category.CategoryViews = _CategoryViews ;            
        this._APIService.Category.CategoryDescription = _CategoryDescription ; 
        this._APIService.URL = this.Category_Url.Url;
        this._APIService.sendClickEvent();
        this.router.navigateByUrl('project/create');
        }
    //#endregion
  //#region selected Category handler
  selectChangeHandler(event: any) {
    this.selectedCategory = event.target.value;
    if(this.selectedCategory != "n")
    this.CategoryListFiltered = this.CategoryList.filter(x=>x.CategoryId ==  +this.selectedCategory  );
    else
    this.CategoryListFiltered = this.CategoryList;
  }
  //#endregion
  }
