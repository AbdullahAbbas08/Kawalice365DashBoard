import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { TargetModel } from 'src/app/Models/target-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

      //#region Constructor
      constructor(public _APIService: APIService,
        public Dialog: MatDialog,
        private router: Router) { }
      //#endregion

      //#region Declare Variables
      TargetDataList: TargetModel[];
      //#endregion

      //#region On Init
      ngOnInit() {
        this.GetTarget();
      }
      //#endregion

      //#region  Alert
      ProgramAlertError() {
        Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
      }
      DeleteTargetAlert() {
        Swal.fire('تم حذف أبعاد الاعلان  بنجاح  ')
      }
      DeleteAlerterr() {
        Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
      }
      //#endregion

      //#region Get Target
      GetTarget() {
        this._APIService.GetTarget().subscribe(
          (data) => {
            this.TargetDataList = data;
          },
          (err) => {  }
        );
      }
      //#endregion

      //#region open Dialog
      openDialog(DataTitle: string, ID: number): void {
        let type = 'أبعاد مكان الإعلان ';
        let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: DataTitle, ID: ID, flag: 7 } });
        DialogRef.afterClosed().subscribe(result => {
          if (result == 'true') {
             //this.TargetDataList = this.TargetDataList.filter(x => x.ADTargetID !== ID); 
             let result = this._APIService.DeleteTarget(ID).subscribe(
              response=>{ this.DeleteTargetAlert(); this.GetTarget(); },
             (err)=>{ this.DeleteAlerterr(); });
             if(result == undefined)
             this.ProgramAlertError();
            }
        });
      }
      //#endregion

      //#region Update Target
      UpdateTarget(
        ADTargetID: number,
        ADTargetTitl: string,
        ADTargetType: string,
        ItemID: number){

        this._APIService._TargetModel.ADTargetID = ADTargetID;
        this._APIService._TargetModel.ADTargetTitle = ADTargetTitl;
        this._APIService._TargetModel.ADTargetType = ADTargetType;
        this._APIService._TargetModel.ItemID = ItemID;

        this._APIService.sendClickEvent();
        this.router.navigateByUrl('project/createTarget');
      }
      //#endregion

}
