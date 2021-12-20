import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { InterviewerModel } from 'src/app/Models/interviewer-model';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-interviewer-list',
  templateUrl: './interviewer-list.component.html',
  styleUrls: ['./interviewer-list.component.scss']
})
export class InterviewerListComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  Collection: CollectionData<InterviewerModel>;
  InterviewerList: InterviewerModel[];
  InterviewerListFiltered: InterviewerModel[];
  _InterviewerIDName:ObjectIDName[];
  Url: String;
  selectedInterviewer:any = "أختر مذيع من القائمة - أختر الكل ";
  selectedInterviewerDefault:any = "أختر مذيع من القائمة - أختر الكل ";
  //#endregion

  //#region OnInit
  ngOnInit() {
    this.getInterviewer();
    this.InterviewerDropDown();
  }
  //#endregion

    //#region Alerts
    ProgramAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
    }
    DeleteAlerterr() {
      Swal.fire('لا يمكن حذف هذا العنصر لانه مرتبط بعناصر أخرى ');
    }
    
      DeleteInterviewerAlert() {
        Swal.fire('تم حذف المذيع  بنجاح  ')
      }
    //#endregion

  //#region Get Interviewer From API 
  getInterviewer() {
    this._APIService.getInterviewer().subscribe(
      (data) => {
        this.Collection = data;
        this.InterviewerList = this.Collection.DataList;
        this.InterviewerListFiltered = this.InterviewerList;
        this.Url = this.Collection.Url;
        // console.log(this.InterviewerList);
      },
      (err) => { 
        // console.log(err)
       }
    );
  }
  //#endregion

  //#region Dialog
  openDialog(InterviewerName: string, ID: number): void {
    let type = 'مذيع';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: InterviewerName, ID: ID, flag: 6 } });
    DialogRef.afterClosed().subscribe
      (result => {
        if (result == 'true') {
          //this.InterviewerListFiltered = this.InterviewerList.filter(x => x.InterviewerId !== ID);
          let result = this._APIService.DeleteInterviewer(ID).subscribe(
            response=>{this.DeleteInterviewerAlert();this.getInterviewer(); },
          (err)=>{ this.DeleteAlerterr(); });
          
          if(result = undefined)
          this.ProgramAlertError()
        }
      });
  }
  //#endregion

  //#region Update interviewer
  Updateinterviewer(
    InterviewerId           : number,
    InterviewerName         : string,
    InterviewerPicture      : string,
    InterviewerCover        : string,
    InterviewerDescription  : string,
    FacebookUrl             : string,
    InstgramUrl             : string,
    TwitterUrl              : string,
    YoutubeUrl              : string,
    LinkedInUrl             : string,
    WebsiteUrl              : string,
    CreationDate            : string,
    BirthDate               : string,
    TiktokUrl               : string,
    Date                    :string
  ) {

    this._APIService._InterviewerModel.InterviewerId = InterviewerId;
    this._APIService._InterviewerModel.InterviewerName = InterviewerName;
    this._APIService._InterviewerModel.InterviewerPicture = InterviewerPicture;
    this._APIService._InterviewerModel.InterviewerCover = InterviewerCover;
    this._APIService._InterviewerModel.InterviewerDescription = InterviewerDescription;
    this._APIService._InterviewerModel.FacebookUrl = FacebookUrl;
    this._APIService._InterviewerModel.InstgramUrl = InstgramUrl;
    this._APIService._InterviewerModel.TwitterUrl = TwitterUrl;
    this._APIService._InterviewerModel.YoutubeUrl = YoutubeUrl;
    this._APIService._InterviewerModel.LinkedInUrl = LinkedInUrl;
    this._APIService._InterviewerModel.WebsiteUrl = WebsiteUrl;
    this._APIService._InterviewerModel.CreationDate = CreationDate;
    this._APIService._InterviewerModel.BirthDate = BirthDate;
    this._APIService._InterviewerModel.TiktokUrl = TiktokUrl;
    this._APIService._InterviewerModel.Date = Date;
    this._APIService.URL = this.Url;

    this._APIService.sendClickEventProgram();
    this.router.navigateByUrl('project/createInterviewer');
  }
  //#endregion

  //#region selected Interviewer handler
  selectChangeHandlerinterviewer(event: any) {
    this.selectedInterviewer = event.target.value;
    console.log(this.selectedInterviewer)
    if(this.selectedInterviewer != "n")
    this.InterviewerListFiltered = this.InterviewerList.filter(x=>x.InterviewerId ==  +this.selectedInterviewer  );
    else
    {
          this.InterviewerListFiltered = this.InterviewerList;
    }
  }
  //#endregion

  //#region Interviewer DropDown
  InterviewerDropDown() {
    this._APIService.InterviewerDropDown().subscribe(
      (data) => {
        this._InterviewerIDName = data;
        this._InterviewerIDName = this._InterviewerIDName.filter(x => x.ID !== this._APIService.Program.InterviewerId);
      },
      (err) => { }
    );
  }
  //#endregion

}
