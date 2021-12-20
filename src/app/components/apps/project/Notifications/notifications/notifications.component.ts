import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { NotificationModel } from 'src/app/Models/notification-model';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  Collection: CollectionData<NotificationModel>;
  NotificationList: NotificationModel[];
  Url: String;
  //#endregion

  //#region OnInit
  ngOnInit() {
    this.GetNotification();
  }
  //#endregion

    //#region  Alert
    ProgramAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
    }
    DeleteNotificationAlert() {
      Swal.fire('تم حذف  التنبيه  بنجاح  ')
    }

    DeleteNotificationerrAlert() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة اخرى  ')
    }
    //#endregion

  //#region Get Episode From API 
  GetNotification() {
    this._APIService.GetNotification().subscribe(
      (data) => {
        this.Collection = data;
        this.NotificationList = this.Collection.DataList;
        this.Url = this.Collection.Url;
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Dialog
  openDialog(SeasonTitle: string, ID: number): void {
    let type = 'تنبيه ';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: SeasonTitle, ID: ID, flag: 11 } });
    DialogRef.afterClosed().subscribe
      (result => {
        if (result == 'true') {
          //this.NotificationList = this.NotificationList.filter(x => x.ID !== ID);
          let result = this._APIService.DeleteNotification(ID).subscribe(
            response=>{ this.DeleteNotificationAlert();this.GetNotification(); },
            (err)=>{ this.DeleteNotificationerrAlert(); });
            if(result == undefined) this.ProgramAlertError();
        }
      });
  }
  //#endregion

  // //#region Update Episode
  // UpdateNotification(
  //   ID            : number,
  //   title         : string,
  //   Descriptions  : string,
  //   IMG           : string,
  //   EpisodeID     : number,
  //   Visible       : boolean,
  //   EpisodeName   : string
  // ) {

  //   this._APIService._NotificationModel.ID = ID;
  //   this._APIService._NotificationModel.title = title;
  //   this._APIService._NotificationModel.Descriptions = Descriptions;
  //   this._APIService._NotificationModel.IMG = IMG;
  //   this._APIService._NotificationModel.EpisodeID = EpisodeID;
  //   this._APIService._NotificationModel.Visible = Visible;
  //   this._APIService._NotificationModel.EpisodeName = EpisodeName;
  //   this._APIService.URL = this.Url;

  //   // this._APIService.sendClickEventProgram();
  //   this.router.navigateByUrl('project/CreateNotification');
  // }
  // //#endregion



}
