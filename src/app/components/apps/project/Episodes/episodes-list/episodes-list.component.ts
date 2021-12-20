import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/ApiServices/api.service';
import { CollectionData } from 'src/app/Models/collection-data';
import { EpisodeModel } from 'src/app/Models/episode-model';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import Swal from 'sweetalert2';
import { DialogExampleComponent } from '../../dialog-example/dialog-example.component';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss']
})
export class EpisodesListComponent implements OnInit {

  //#region Constructor
  constructor(public _APIService: APIService,
    public Dialog: MatDialog,
    private router: Router) { }
  //#endregion

  //#region  Declare Variables
  Collection: CollectionData<EpisodeModel>;
  EpisodesList: EpisodeModel[];
  EpisodesListFiltered: EpisodeModel[];
  ProgramList: ObjectIDName[];
  _SeasonIDName: ObjectIDName[]=[{ID:0,Name:' أختر موسم من القائمة - إظهار الكل'}];

  selectedProgram:any;
  selectedSeason:any;
  SelectSeason:boolean;

  Url: String;
  DefaultSelectProgram:any = " أختر برنامج من القائمة - إظهار الكل ";
  DefaultSelectSeason:any = " أختر موسم من القائمة - إظهار الكل ";
  //#endregion

  //#region OnInit
  ngOnInit() {
    this.SelectSeason = true;
    this.getEpisodes();
    this.ProgramRelatedDropDown();
  }
  //#endregion

      //#region alert
      ProgramAlertError() {
        Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى')
      }
      DeleteEpisodeAlert() {
        Swal.fire('تم حذف الحلقة  بنجاح  ')
      }
      DeleteEpisodeErrAlert() {
        Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى ')
      }
    //#endregion

  //#region program DropDown
  ProgramRelatedDropDown() {
    this._APIService.ProgramDropDown().subscribe(
      (data) => {  this.ProgramList = data;  },
      (err) => {  } ); }
  //#endregion

  //#region season DropDown
  SeasonsRelatedDropDown(ProgramID:number=0) {
    this._APIService.SeasonsRelatedDropDown(ProgramID).subscribe(
      (data) => 
      {

        this._SeasonIDName = data;
        this.DefaultSelectSeason =" أختر موسم من القائمة - إظهار الكل";
        this.SelectSeason = false

         if(this._SeasonIDName.length == 0)
         {
           this.DefaultSelectSeason = "لا يوجد مواسم ";
           this.SelectSeason = true
        }
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Get Episode From API 
  getEpisodes() {
    this._APIService.getEpisodes().subscribe(
      (data) => {
        this.Collection = data;
        this.EpisodesList = this.Collection.DataList;
        this.EpisodesListFiltered = this.Collection.DataList;
        this.Url = this.Collection.Url;
        // console.log(this.EpisodesListFiltered);
      },
      (err) => {  }
    );
  }
  //#endregion

  //#region Dialog
  openDialog(SeasonTitle: string, ID: number): void {
    let type = 'برنامج';
    let DialogRef = this.Dialog.open(DialogExampleComponent, { data: { type: type, name: SeasonTitle, ID: ID, flag: 5 } });
    DialogRef.afterClosed().subscribe
      (result => {
        // console.log(result);
        if (result =='true') {
          // this.getEpisodes();
         // this.EpisodesList = this.EpisodesList.filter(x => x.EpisodeId !== ID);
          let result =  this._APIService.DeleteEpisode(ID).subscribe(
          response=>{ 
            this.DeleteEpisodeAlert();
             this.getEpisodes();
            },
          (err)=>{this.DeleteEpisodeErrAlert();});
          if(result == undefined)this.ProgramAlertError();
        }
      });
  }
  //#endregion

  //#region Update Episode
  UpdateEpisode(
    EpisodeId: number,
    EpisodeTitle: string,
    EpisodeDescription: string,
    YoutubeUrl: string,
    EpisodeIamgePath: string,
    EpisodeVisible: boolean,
    EpisodeViews: number,
    EpisodePublishDate: string,
    SessionId: number,   
    SeasonTitle:string,
    ProgramId:number,
    ProgramName:string,
    CategoryId:number,
    CategoryTitle:string,
    ProgramTypeId:number,
    ProgramTypeTitle:string,
    InterviewerName:string,
    Date:string,
    Hour:any,
    Minute:any)
     {
    this._APIService._EpisodeModel.EpisodeId          = EpisodeId;
    this._APIService._EpisodeModel.EpisodeTitle       = EpisodeTitle;
    this._APIService._EpisodeModel.EpisodeDescription = EpisodeDescription;
    this._APIService._EpisodeModel.EpisodeUrl         = YoutubeUrl;
    this._APIService._EpisodeModel.EpisodeImg         = EpisodeIamgePath;
    this._APIService._EpisodeModel.EpisodeVisible     = EpisodeVisible;
    this._APIService._EpisodeModel.EpisodeViews       = EpisodeViews;
    this._APIService._EpisodeModel.EpisodePublishDate = EpisodePublishDate;
    this._APIService._EpisodeModel.SessionId          = SessionId;
    this._APIService._EpisodeModel.SeasonTitle        = SeasonTitle;
    this._APIService._EpisodeModel.ProgramId          = ProgramId;
    this._APIService._EpisodeModel.ProgramName        = ProgramName;
    this._APIService._EpisodeModel.CategoryId         = CategoryId;
    this._APIService._EpisodeModel.CategoryTitle      = CategoryTitle;
    this._APIService._EpisodeModel.ProgramTypeId      = ProgramTypeId;
    this._APIService._EpisodeModel.ProgramTypeTitle   = ProgramTypeTitle;
    this._APIService._EpisodeModel.InterviewerName   = InterviewerName;
    this._APIService._EpisodeModel.Date   = Date;
    this._APIService._EpisodeModel.Hour   = Hour;
    this._APIService._EpisodeModel.Minute   = Minute;

    this._APIService.URL = this.Url;
    this._APIService.sendClickEventProgram();
    this.router.navigateByUrl('project/createEpisode');
  }
  //#endregion

  //#region selected Program handler
  selectHandlerProgram(event: any) {
    this.selectedProgram = event.target.value;
    if(this.selectedProgram !="n")
    {
      this.EpisodesListFiltered = this.EpisodesList.filter(x=>x.ProgramId == this.selectedProgram);
      this.SeasonsRelatedDropDown(this.selectedProgram);
    }
    else
    {
      this.SelectSeason = true;
      this._SeasonIDName = [{ID:0,Name:'أختر برنامج من القائمة - إظهار الكل'}];
      this.EpisodesListFiltered = this.EpisodesList;
      this.DefaultSelectSeason = " أختر موسم من القائمة - إظهار الكل ";
    }
  }
  //#endregion

  //#region selected Season handler
    selectChangeHandlerSeason(event: any) {
      this.selectedSeason = event.target.value;
      if(this.selectedSeason !="n")
      {
         this.EpisodesListFiltered = this.EpisodesList.filter(x=>x.SessionId == this.selectedSeason);
      }
      else
      {
        this.EpisodesListFiltered = this.EpisodesList.filter(x=>x.ProgramId == this.selectedProgram);
      }
    }
  //#endregion

}
