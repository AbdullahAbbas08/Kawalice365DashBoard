import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { StyleModel } from 'src/app/Models/style-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-style-ads',
  templateUrl: './style-ads.component.html',
  styleUrls: ['./style-ads.component.scss']
})
export class StyleAdsComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region Declare Variables
  _StyleModel: StyleModel[];
  //#endregion

  //#region On Init
  ngOnInit() {
    this.GetStyle();
  }

    //#region  Alert
    GeneralErrorMessege() {
      Swal.fire(' حدث خطأ فى إيجاد البيانات برجاء المحاولة مرة أخرى')
    }
    //#endregion

  //#endregion

//#region  Alert
ProgramAlertError() {
  Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
}
DeleteTargetAlert() {
  Swal.fire('تم حذف تارجت الاعلان  بنجاح  ')
}

DeleteAlerterr() {
  Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
}
//#endregion

  //#region Get Target
  GetStyle() {
    let result = this._APIService.GetStyle().subscribe(
      (data) => {
        this._StyleModel = data;
      },
      (err) => {  }
    );
    if(result == undefined)
      this.GeneralErrorMessege();
  }
  //#endregion

  //#region open Dialog
  openDialog(DataTitle: string, ID: number): void {
    let type = 'أبعاد مكان الإعلان ';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: DataTitle, ID: ID, flag: 8 } });
    DialogRef.afterClosed().subscribe(
      result => {
      if (result == 'true') {
        //this._StyleModel = this._StyleModel.filter(x => x.ADStyleId !== ID);
        let result = this._APIService.DeleteStyle(ID).subscribe(
          response=>{ this.DeleteTargetAlert();this.GetStyle() },
          (err)=>{ this.DeleteAlerterr(); });
          if(result == undefined) this.ProgramAlertError();
      }
    },err=>{
    });
  }
  //#endregion

  //#region Update Target
  UpdateStyle(
    ADStyleId: number,
    ADStyleTitle: string,
    ADWidth: number,
    ADHeight: number
  ) {
    this._APIService._StyleModel.ADStyleId = ADStyleId;
    this._APIService._StyleModel.ADStyleTitle = ADStyleTitle;
    this._APIService._StyleModel.ADWidth = ADWidth;
    this._APIService._StyleModel.ADHeight = ADHeight;

    this._APIService.sendClickEvent();
    this.router.navigateByUrl('project/createStyle');
  }
  //#endregion


}
