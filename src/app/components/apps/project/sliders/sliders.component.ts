import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { ProgramTypeModel } from 'src/app/Models/program-type-model';
import { Slider } from 'src/app/Models/Slider';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region Declare Variables
  SliderCollection: CollectionData<Slider>;
  SliderList: Slider[];
  Url: String;

  //#endregion

  //#region On Init
  ngOnInit() {
    this.GetProgramTypes();
  }
  //#endregion

  //#region Alerts
  ProgramAlertError() {
    Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
  }
  DeleteAlerterr() {
    Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
  }
  DeleteProgramTypeAlert() {
    Swal.fire('تم حذف نوع البرنامج  بنجاح  ')
  }
  //#endregion

  //#region Get Program Types
  GetProgramTypes() {
    this._APIService.GetSlider().subscribe(
      (data) => {
        this.SliderCollection = data;
        this.SliderList = data.DataList;
        this.Url = data.Url;
      },
      (err) => { }
    );
  }
  //#endregion

  //#region open Dialog
  openDialog(DataTitle: string, ID: number): void {
    let type = 'نوع برنامج ';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: DataTitle, ID: ID, flag: 3 } });
    DialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'true') {
        let result = this._APIService.DeleteProgramType(ID).subscribe(
          response => { this.DeleteProgramTypeAlert(); this.GetProgramTypes() },
          (err) => { this.DeleteAlerterr(); });

        if (result == undefined)
          this.ProgramAlertError();
      }
    });
  }
  //#endregion

  //#region Update Program Type
  UpdateSlider(
    SliderId: number,
    SliderTitle: string,
    SliderImagePath: string,
    ImageForWeb: string,
    EpisodeTitle: string,
    SliderOrder: number,
    EpisodeId: number) {

     this._APIService.slider.SliderId = SliderId;
     this._APIService.slider.SliderTitle = SliderTitle;
     this._APIService.slider.SliderImagePath = SliderImagePath;
     this._APIService.slider.ImageForWeb = ImageForWeb;
     this._APIService.slider.SliderOrder = SliderOrder;
     this._APIService.slider.EpisodeId = EpisodeId;
     this._APIService.slider.EpisodeTitle = EpisodeTitle;
     this._APIService.URL =this.Url ;
   
    this._APIService.sendClickEvent();
    this.router.navigateByUrl('project/UpdateSlider');
  }
  //#endregion


}
