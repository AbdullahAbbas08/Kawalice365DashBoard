import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { AdsModel } from 'src/app/Models/ads-model';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisment.component.html',
  styleUrls: ['./advertisment.component.scss']
})
export class AdvertismentComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  Collection: CollectionData<AdsModel>;
  ADSList: AdsModel[];
  Url: String;
  //#endregion

  //#region OnInit
  ngOnInit() {
    this.getADS();
  }
  //#endregion


  //#region  Alert
  GeneralErrorMessege() {
    Swal.fire(' حدث خطأ فى إيجاد البيانات برجاء المحاولة مرة أخرى')
  }
  //#endregion

    //#region  Alert
    DeleteADSAlert() {
        Swal.fire('تم حذف مكان الاعلان  بنجاح')
      }

      DeleteAlerterr() {
        Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
      }
    //#endregion

  //#region Get ADS From API 
  getADS() {
    let result = this._APIService.getADS().subscribe(
      (data) => {
        this.Collection = data;
        this.ADSList = this.Collection.DataList;
        this.Url = this.Collection.Url;
       
      },
      (err) => { this.GeneralErrorMessege(); }
    );
    if(result == undefined)
      this.GeneralErrorMessege();
  }
  //#endregion

  //#region open Dialog
      openDialog(DataTitle : string , ID:number): void 
      {
        let type = 'مكان إعلان';
        let DialogRef =   this.Dialog.open(DialogExampleComponent , {data:{type:type,name:DataTitle,ID:ID , flag:10}});
          DialogRef.afterClosed().subscribe(result=>{
          if(result == 'true' )
          {
            let result = this._APIService.DeleteAds(ID).subscribe(
              response=>{this.DeleteADSAlert();this.getADS();},
              (err)=>{ this.DeleteAlerterr(); });
              if(result == undefined)this. GeneralErrorMessege();
          //  this.CategoryListFiltered = this.CategoryListFiltered.filter(x=>x.CategoryId !== ID );
          }
      });
      }
    //#endregion

  //#region Update Episode
  UpdateADS(
    AdId                :number,
    AdTitle             :string,
    ImagePath           :string,
    URL                 :string,
    Views               :number,
    PlaceHolderID       :number,
    ClientID            :string,
    PublishStartDate    :string,
    PublishEndDate      :string,
    PlaceHolderCode     :string,
    ClientName          :string,
    dates:string,dated:string,
    hours:any,hourd:any,
    minutes:any,minuted:any
    )
     {
      // this._APIService._AdsModel

      this._APIService._AdsModel.AdId             = AdId            ;    
      this._APIService._AdsModel.AdTitle          = AdTitle         ;    
      this._APIService._AdsModel.ImagePath        = ImagePath       ;    
      this._APIService._AdsModel.URL              = URL             ;    
      this._APIService._AdsModel.Views            = Views           ;    
      this._APIService._AdsModel.PlaceHolderID    = PlaceHolderID   ;    
      this._APIService._AdsModel.ClientID         = ClientID        ;    
      this._APIService._AdsModel.PublishStartDate = PublishStartDate;    
      this._APIService._AdsModel.PublishEndDate   = PublishEndDate  ;    
      this._APIService._AdsModel.PlaceHolderCode  = PlaceHolderCode ;    
      this._APIService._AdsModel.ClientName       = ClientName      ; 
      this._APIService._AdsModel.Dates    = dates;      
      this._APIService._AdsModel.Dated    = dated;      
      this._APIService._AdsModel.Hours    = hours;      
      this._APIService._AdsModel.Hourd    = hourd;
      this._APIService._AdsModel.Minutes  = minutes;
      this._APIService._AdsModel.Minuted  = minuted;
    this._APIService.URL = this.Url;
    this._APIService.URL = this.Url;

    this._APIService.sendClickEventProgram();
    this.router.navigateByUrl('project/createAdvertisment');
  }
  //#endregion

}
