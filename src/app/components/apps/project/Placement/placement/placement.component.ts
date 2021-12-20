import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { PlacementModel } from 'src/app/Models/placement-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  Collection: CollectionData<PlacementModel>;
  PlacementList: PlacementModel[];
  Url: String;
  //#endregion

  //#region OnInit
  ngOnInit() {
    this.GetPlacement();
  }
  //#endregion

      //#region  Alert
      DeletePlacementAlert() {
        Swal.fire('تم حذف مكان الاعلان  بنجاح  ')
      }
      DeleteAlerterr() {
        Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
      }
      //#endregion

  //#region Get Episode From API 
  GetPlacement() {
    this._APIService.GetPlacement().subscribe(
      (data) => {
        this.Collection = data;
        this.PlacementList = this.Collection.DataList;
        this.Url = this.Collection.Url;  
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Dialog
  openDialog(SeasonTitle: string, ID: number): void {
    let type = 'برنامج';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: SeasonTitle, ID: ID, flag: 9 } });
    DialogRef.afterClosed().subscribe
      (result => {
        console.log(result);
        if (result == 'true') {
          //this.PlacementList = this.PlacementList.filter(x => x.ADPlaceholderID !== ID);
          this._APIService.DeletePlacement(ID).subscribe(
            response=>{
            this.DeletePlacementAlert();
          },
          (err)=>{ this.DeleteAlerterr(); });
        }
      });
  }
  //#endregion

  //#region Update Episode
  UpdatePlacement(
    ADPlaceholderID: number,
    ADPlaceholderCode: number,
    AdStyleID: number,
    AdTargetId: number,
    Title: string,
    ImagePath: string,
    style: string,
    target: string) {

    this._APIService._PlacementModel.ADPlaceholderID = ADPlaceholderID;
    this._APIService._PlacementModel.ADPlaceholderCode = ADPlaceholderCode;
    this._APIService._PlacementModel.AdStyleID = AdStyleID;
    this._APIService._PlacementModel.AdTargetId = AdTargetId;
    this._APIService._PlacementModel.Title = Title;
    this._APIService._PlacementModel.ImagePath = ImagePath;
    this._APIService._PlacementModel.ADTargetTitle = target;
    this._APIService._PlacementModel.ADStyleTitle = style;


    this._APIService.URL = this.Url;

    this._APIService.sendClickEventProgram();
    this.router.navigateByUrl('project/CreatePlacement');
  }
  //#endregion


}
