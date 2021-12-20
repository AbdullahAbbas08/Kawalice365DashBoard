import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Category } from '../Models/category';
import { ObjectIDName } from '../Models/object-id-name';
import { ProgramModel } from '../Models/program-model';
import { environment } from '../../environments/environment.prod';
import { CollectionData } from '../Models/collection-data';
import { ProgramInsert } from '../Models/program-insert';
import { ProgramUpdate } from '../Models/program-update';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ProgramTypeModel } from '../Models/program-type-model';
import { ProgramTypeInsert } from '../Models/program-type-insert';
import { ProgramTypeUpdate } from '../Models/program-type-update';
import { SeasonModel } from '../Models/season-model';
import { SeasonUpdate } from '../Models/season-update';
import { SeasonInsert } from '../Models/season-insert';
import { EpisodeModel } from '../Models/episode-model';
import { InterviewerModel } from '../Models/interviewer-model';
import { InterviewerInsert } from '../Models/interviewer-insert';
import { AdsModel } from '../Models/ads-model';
import { ObjectIDNameClient } from '../Models/object-idname-client';
import { AdsInsert } from '../Models/ads-insert';
import { AdsUpdate } from '../Models/ads-update';
import { TargetModel } from '../Models/target-model';
import { CreateTarget } from '../Models/create-target';
import { StyleModel } from '../Models/style-model';
import { PlacementModel } from '../Models/placement-model';
import { PlacementInsert } from '../Models/placement-insert';
import { PlacementUpdate } from '../Models/placement-update';
import { NotificationModel } from '../Models/notification-model';
import { NotificationInsert } from '../Models/notification-insert';
import { Slider } from '../Models/Slider';


@Injectable({
  providedIn: 'root'
})
export class APIService implements OnInit {

  //#region Constructor
  constructor(private http: HttpClient) { }
  //#endregion

  //#region ng Init
  ngOnInit(): void {
    this.Category = new Category();
  }
  //#endregion

  //#region Declare Variables
  Category: Category = new Category();
  URL: String;
  Program: ProgramModel = new ProgramModel();
  ProgramType: ProgramTypeModel = new ProgramTypeModel();
  _SeasonUpdate: SeasonUpdate = new SeasonUpdate();
  _SeasonModel: SeasonModel = new SeasonModel();
  _EpisodeModel: EpisodeModel = new EpisodeModel();
  _InterviewerModel :InterviewerModel = new InterviewerModel();
  _AdsModel:AdsModel = new AdsModel();
  _TargetModel:TargetModel = new TargetModel();
  _StyleModel:StyleModel=new StyleModel();
  _PlacementModel:PlacementModel= new PlacementModel();
  _NotificationModel:NotificationModel = new NotificationModel();
  _DefaultSelectStyle : string;
  DefaultSelectTarget : string;
  slider:Slider = new Slider();
  //#endregion

  //#region Options
  httpOptionsWithKey = { headers: new HttpHeaders({ 'ApiKey': 'ac6716a0-039d-4d21-98b5-dcefa416e266', 'Accept': ' */*' }) };
  httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
  //#endregion

  //#region Categories API's

  GetCategories(): Observable<CollectionData<Category>> {
    return this.http.get<CollectionData<Category>>(`${environment.Server_URL}/episodes/getallcategories`, this.httpOptionsWithKey);
  }

  CreateCategory(CategoryImg: FormData, CategoryTitle: string, CategoryVisible: boolean, CategoryOrder: number): Observable<Category> {
    return this.http.post<Category>(`${environment.Server_URL}/categories/createcategory?CategoryTitle=${CategoryTitle}&CategoryVisible=${CategoryVisible}&CategoryOrder=${CategoryOrder}`, CategoryImg);
  }

  DeleteCategory(ID: number) {
    return this.http.delete(`${environment.Server_URL}/categories/${ID}`,this.httpOptionsWithKey);
  }

  EditCategory(CategoryImg: FormData, CategoryId: number, CategoryTitle: string, CategoryVisible: boolean, CategoryOrder: number, View: number): Observable<Category> {
    return this.http.put<Category>(`${environment.Server_URL}/categories/putcategories?CategoryID=${CategoryId}&CategoryTitle=${CategoryTitle}&CategoryVisible=${CategoryVisible}&CategoryOrder=${CategoryOrder}&CategoryViews=${View}`, CategoryImg);
  }

  //#endregion

  //#region  Programs API's

  GetPrograms(): Observable<CollectionData<ProgramModel>> {
    return this.http.get<CollectionData<ProgramModel>>(`${environment.Server_URL}/programs/getallprograms`, this.httpOptionsWithKey);
  }

  DeleteProgram(ID: number) {
    return this.http.delete(`${environment.Server_URL}/programs/${ID}`).pipe(map(user => {
      return user;
    }));
  }

  //CreateProgram( this.FormDataImage , Name , Description ,Visible , Order , Type,InterviewerName, CategoryName,ProgramStartDate).subscribe(

  CreateProgram(Img: FormData, Name: string, Visible: boolean, Order: number, Type: number, InterviewerID: number, CategoryID: Number, PromoUrl: string, ProgramStartDate: string , hour:any , minute:any): Observable<ProgramInsert> {
    return this.http.post<ProgramInsert>(`${environment.Server_URL}/programs/createprogram?ProgramName=${Name}&ProgramPromoUrl=${PromoUrl}&ProgramVisible=${Visible}&CategoryId=${CategoryID}&ProgramStartDate=${ProgramStartDate}&InterviewerId=${InterviewerID}&ProgramOrder=${Order}&ProgramTypeId=${Type}&Hour=${hour}&Minute=${minute}`, Img);
  }

  //      this._APIService.UpdateProgram( this.ImageUpdate , this.ProgramID,this.ProgramName,this.ProgramStartDate,this.ProgramTypeID ,this.ProgramOrder,this.ProgramVisible , this.CategoryID,this.InterviewerID ,this.ProgramDescription )
  UpdateProgram(ImageUpdate: FormData, ProgramID: number, ProgramName: string, ProgramStartDate: string, ProgramTypeID: number, ProgramOrder: number, ProgramVisible: boolean, CategoryID: number, InterviewerID: number, hour:any , minute:any,changeDate:any): Observable<ProgramUpdate> {
    return this.http.put<ProgramUpdate>(`${environment.Server_URL}/programs/putprogram?ProgramId=${ProgramID}&InterviewerId=${InterviewerID}&ProgramTypeId=${ProgramTypeID}&CategoryId=${CategoryID}&ProgramOrder=${ProgramOrder}&ProgramName=${ProgramName}&ProgramVisible=${ProgramVisible}&ProgramStartDate=${ProgramStartDate}&Hour=${hour}&Minute=${minute}&changeDate=${changeDate}`, ImageUpdate,this.httpOptionsWithKey);
  }

  //#endregion

  //#region  Handle Click Event
  public subject = new Subject<Category[]>();
  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  public subjectProgram = new Subject<ProgramModel[]>();
  sendClickEventProgram() {
    this.subjectProgram.next();
  }
  getClickEventProgram(): Observable<any> {
    return this.subjectProgram.asObservable();
  }
  //#endregion

  //#region Program Types API's
  ProgramTypesDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/programtypes/GetProgramType_ID_Name`, this.httpOptionsWithKey);
  }

  InsertProgramType(Img: FormData, Title: string, Order: number): Observable<ProgramTypeInsert> {
    return this.http.post<ProgramTypeInsert>(`${environment.Server_URL}/programtypes/createprogramtype?ProgramTypeTitle=${Title}&ProgramTypeOrder=${Order}`, Img);
  }

  EditProgramType(Img: FormData, Id: number, Title: string, Order: number): Observable<ProgramTypeUpdate> {
    return this.http.put<ProgramTypeUpdate>(`${environment.Server_URL}/programtypes/putprogramtype?ProgramTypeId=${Id}&ProgramTypeTitle=${Title}&ProgramTypeOrder=${Order}`, Img);
  }

  GetProgramTypes(): Observable<CollectionData<ProgramTypeModel>> {
    return this.http.get<CollectionData<ProgramTypeModel>>(`${environment.Server_URL}/programtypes/getallprogramTypes`, this.httpOptionsWithKey);
  }

  DeleteProgramType(ID: number) {
    return this.http.delete(`${environment.Server_URL}/programtypes/${ID}`);
  }

  //#endregion

  //#region Season API's

  GetSeason(): Observable<SeasonModel[]> {
    return this.http.get<SeasonModel[]>(`${environment.Server_URL}/season/getallseasons`, this.httpOptionsWithKey);
  }

  InsertSeason(Title: string, Views: number, programID: number): Observable<SeasonInsert> {
    return this.http.post<SeasonInsert>(`${environment.Server_URL}/season/createseason?SessionTitle=${Title}&ProgramId=${programID}&SeasonViews=${Views}`, programID, this.httpOptionsWithKey);
  }
  EditSeason(ID: number, ProgramID: number, Title: string, Views: number): Observable<ProgramTypeUpdate> {
    return this.http.put<ProgramTypeUpdate>(`${environment.Server_URL}/season/putseason?SessionId=${ID}&ProgramId=${ProgramID}&SessionTitle=${Title}&SeasonViews=${Views}`, Views, this.httpOptionsWithKey);
  }
  DeleteSeason(ID: number) {
    return this.http.delete(`${environment.Server_URL}/season/${ID}`);
  }

  //#endregion

  //#region Episodes API's
  getEpisodes(): Observable<CollectionData<EpisodeModel>> {
    return this.http.get<CollectionData<EpisodeModel>>(`${environment.Server_URL}/episodes/episodes`, this.httpOptionsWithKey);
  }
 
//    this._APIService.CreateEpisode(this.FormDataImage, this.EpisodeTitle, this.EpisodeDescription, this.EpisodeUrl, this.EpisodeVisible, this.Date, this.SeasonName , this.Hour , this.Minute).
  CreateEpisode(Img: FormData, EpisodeTitle: string, YoutubeUrl: string, EpisodeVisible: boolean, EpisodePublishDate: string,SessionId: number,Hour:any,Minute:any): Observable<ProgramInsert> {
    return this.http.post<ProgramInsert>(`${environment.Server_URL}/episodes/createepisode?EpisodeTitle=${EpisodeTitle}&YoutubeUrl=${YoutubeUrl}&EpisodeVisible=${EpisodeVisible}&LikeRate=0&DislikeRate=0&EpisodeViews=0&SeasonId=${SessionId}&EpisodePublishDate=${EpisodePublishDate}&Hour=${Hour}&Minute=${Minute}`, Img, this.httpOptionsWithKey);
  }

  UpdateEpisode(Img: FormData, EpisodeId: number, EpisodeTitle: string, YoutubeUrl: string, EpisodeVisible: boolean, EpisodePublishDate: string, Hour:any,Minute:any, SessionId: number,changeDate:boolean): Observable<ProgramUpdate> {
    return this.http.put<ProgramUpdate>(`${environment.Server_URL}/episodes/putepisode?EpisodeId=${EpisodeId}&EpisodeTitle=${EpisodeTitle}&YoutubeUrl=${YoutubeUrl}&EpisodeVisible=${EpisodeVisible}&SeasonId=${SessionId}&EpisodePublishDate=${EpisodePublishDate}&Hour=${Hour}&Minute=${Minute}&changeDate=${changeDate}`, Img, this.httpOptionsWithKey);
  }
  DeleteEpisode(ID: number) {
    return this.http.delete(`${environment.Server_URL}/episodes/${ID}`);
  }
  //#endregion

  //#region Interviewer API's 
  getInterviewer(): Observable<CollectionData<InterviewerModel>> {
    return this.http.get<CollectionData<InterviewerModel>>(`${environment.Server_URL}/interviewers/getalliterviewers`, this.httpOptionsWithKey);
  }
  DeleteInterviewer(ID: number) {
    return this.http.delete(`${environment.Server_URL}/interviewers/${ID}`);
  }

  CreateInterviewer(Img: FormData, InterviewerName: string, FacebookUrl:string,InstgramUrl:string,TwitterUrl:string,YoutubeUrl:string,LinkedInUrl:string,WebsiteUrl:string,BirthDate:string,TiktokUrl:string): Observable<InterviewerInsert> {
    return this.http.post<InterviewerInsert>(`${environment.Server_URL}/interviewers/createinterviewer?InterviewerName=${InterviewerName}&FacebookUrl=${FacebookUrl}&InstgramUrl=${InstgramUrl}&TwitterUrl=${TwitterUrl}&YoutubeUrl=${YoutubeUrl}&LinkedInUrl=${LinkedInUrl}&WebsiteUrl=${WebsiteUrl}&TiktokUrl=${TiktokUrl}&BirthDate=${BirthDate}`, Img);
  }

  UpdateInterviewer(Img: FormData,InterviewerID:number, InterviewerName: string , FacebookUrl:string,InstgramUrl:string,TwitterUrl:string,YoutubeUrl:string,LinkedInUrl:string,WebsiteUrl:string,BirthDate:string,TiktokUrl:string,changeDate:boolean): Observable<InterviewerInsert> {
    return this.http.put<InterviewerInsert>(`${environment.Server_URL}/interviewers/putinterviewer?InterviewerId=${InterviewerID}&InterviewerName=${InterviewerName}&FacebookUrl=${FacebookUrl}&InstgramUrl=${InstgramUrl}&TwitterUrl=${TwitterUrl}&YoutubeUrl=${YoutubeUrl}&LinkedInUrl=${LinkedInUrl}&WebsiteUrl=${WebsiteUrl}&TiktokUrl=${TiktokUrl}&BirthDate=${BirthDate}&changeDate=${changeDate}`, Img);
  }
  //#endregion

  //#region Adertisement
  getADS(): Observable<CollectionData<AdsModel>> {
    return this.http.get<CollectionData<AdsModel>>(`${environment.Server_URL}/ADS/adsDashboard`, this.httpOptionsWithKey);
  }
//UpdateAds(this.ImageUpdate,   this.AdTitle, this.URL, this.PlaceHolderID, this.ClientName, this.Dates, this.Dated , this.SelectHour , this.SelectHourd ,this.SelectMinute,this.SelectMinuted ).subscribe(
  CreateADS(FormDataImage :FormData,AdTitle:string,URL:string,PlacementID:any,ClientName:string,PublishStartDate:string,PublishEndDate:string, hours:any,hourd:any,minutes:any,minuted): Observable<AdsInsert> {
    return this.http.post<AdsInsert>(`${environment.Server_URL}/ADS/createads?AdTitle=${AdTitle}&URL=${URL}&PlaceHolderID=${PlacementID}&ClientID=${ClientName}&PublishStartDate=${PublishStartDate}&PublishEndDate=${PublishEndDate}&Hours=${hours}&Hourd=${hourd}&Minutes=${minutes}&Minuted=${minuted}`,FormDataImage,this.httpOptionsWithKey);
  }
  UpdateAds(FormDataImage :FormData,AdId:number,AdTitle:string,URL:string,PlacementID:any,ClientName:string,PublishStartDate:string,PublishEndDate:string , hours:any,hourd:any,minutes:any,minuted,changes:boolean,changed:boolean): Observable<AdsUpdate> {
    return this.http.put<AdsUpdate>(`${environment.Server_URL}/ADS/updateads?AdId=${AdId}&AdTitle=${AdTitle}&URL=${URL}&PlaceHolderID=${PlacementID}&ClientID=${ClientName}&PublishStartDate=${PublishStartDate}&PublishEndDate=${PublishEndDate}&Hours=${hours}&Hourd=${hourd}&Minutes=${minutes}&Minuted=${minuted}&changeDates=${changes}&changeDated=${changed}`,FormDataImage,this.httpOptionsWithKey);
  }
  DeleteAds(ID: number) {
    return this.http.delete(`${environment.Server_URL}/ADS/${ID}`,this.httpOptionsWithKey);
  }
  //#endregion

  //#region Target API's 

  GetTarget(): Observable<TargetModel[]> {
    return this.http.get<TargetModel[]>(`${environment.Server_URL}/ADTargets/getalladtargets`, this.httpOptionsWithKey);
  }
  UpdateTarget(ADTargetID:number ,ADTargetTitl:string,ADTargetType:string,ItemID:number): Observable<TargetModel> {
    return this.http.put<TargetModel>(`${environment.Server_URL}/ADTargets/updateadtarget?ADTargetID=${ADTargetID}&ADTargetTitle=${ADTargetTitl}&ADTargetType=${ADTargetType}&ItemID=${ItemID}`,ItemID , this.httpOptionsWithKey);
  }
  InsertTarget(ADTargetTitl:string,ADTargetType:string,ItemID:number): Observable<CreateTarget> {
    return this.http.post<CreateTarget>(`${environment.Server_URL}/ADTargets/createadtarget?ADTargetTitle=${ADTargetTitl}&ADTargetType=${ADTargetType}&ItemID=${ItemID}`, ItemID, this.httpOptionsWithKey);
  }

  DeleteTarget(ID: number) {
    return this.http.delete(`${environment.Server_URL}/ADTargets/${ID}`,this.httpOptionsWithKey);
  }

  //#endregion

  //#region  Style ADS
  GetStyle(): Observable<StyleModel[]> {
    return this.http.get<StyleModel[]>(`${environment.Server_URL}/AdStyles/getallstyles`, this.httpOptionsWithKey);
  }
  DeleteStyle(ID: number) {
    return this.http.delete(`${environment.Server_URL}/AdStyles/${ID}`,this.httpOptionsWithKey);
  }
  InsertStyle(title:string,width:number,height:number): Observable<StyleModel> {
    return this.http.post<StyleModel>(`${environment.Server_URL}/AdStyles/createadstyle?ADStyleTitle=${title}&ADWidth=${width}&ADHeight=${height}`, title, this.httpOptionsWithKey);
  }
  UpdateStyle(ID:number,title:string,width:number,height:number): Observable<StyleModel> {
    return this.http.put<StyleModel>(`${environment.Server_URL}/AdStyles/updateadstyle?ADStyleId=${ID}&ADStyleTitle=${title}&ADWidth=${width}&ADHeight=${height}`,title , this.httpOptionsWithKey);
  }
  //#endregion

  //#region  PlacementModel
  GetPlacement(): Observable<CollectionData<PlacementModel>> {
    return this.http.get<CollectionData<PlacementModel>>(`${environment.Server_URL}/ADPlaceholders/getallads`, this.httpOptionsWithKey);
  }
  DeletePlacement(ID: number) {
    return this.http.delete(`${environment.Server_URL}/ADPlaceholders/${ID}`,this.httpOptionsWithKey);
  }
  InsertPlacement(IMG:FormData,ADPlaceholderCode:number,AdTargetId:any,AdStyleID:any,Title:string): Observable<PlacementInsert> {
    return this.http.post<PlacementInsert>(`${environment.Server_URL}/ADPlaceholders/createplaceholder?ADPlaceholderCode=${ADPlaceholderCode}&AdTargetId=${AdTargetId}&AdStyleID=${AdStyleID}&Title=${Title}`, IMG, this.httpOptionsWithKey);
  }
  UpdatePlacement(IMG:FormData,ADPlaceholderID:number,ADPlaceholderCode:number,AdTargetId:number,AdStyleID:number,Title:string): Observable<PlacementUpdate> {
    return this.http.put<PlacementUpdate>(`${environment.Server_URL}/ADPlaceholders/updateplaceholder?ADPlaceholderID=${ADPlaceholderID}&ADPlaceholderCode=${ADPlaceholderCode}&AdStyleID=${AdStyleID}&AdTargetId=${AdTargetId}&Title=${Title}`,IMG , this.httpOptionsWithKey);
  }




  //#endregion

  //#region Notification
  GetNotification(): Observable<CollectionData<NotificationModel>> {
    return this.http.get<CollectionData<NotificationModel>>(`${environment.Server_URL}/Notifications/getallnotification`, this.httpOptionsWithKey);
  }
  InsertNotification(FormData:FormData): Observable<NotificationInsert> {
    return this.http.post<NotificationInsert>(`${environment.Server_URL}/Notifications/SendNotification`, FormData, this.httpOptionsWithKey);
  }
  UpdateNotification(IMG:FormData,ID:number,title:string,Descriptions:string,EpisodeID:number,Visible:boolean=true): Observable<NotificationModel> {
    return this.http.put<NotificationModel>(`${environment.Server_URL}/Notifications/putnotification?ID=${ID}&title=${title}&Descriptions=${Descriptions}&EpisodeID=${EpisodeID}&Visible=${Visible}`,IMG , this.httpOptionsWithKey);
  }
  DeleteNotification(ID: number) {
    return this.http.delete(`${environment.Server_URL}/Notifications/${ID}`,this.httpOptionsWithKey);
  }
  //#endregion

  //#region DropDown List API's
  CategoriesDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/categories/getcategories_id_name`, this.httpOptionsWithKey);
  }
  InterviewerDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/interviewers/GetInterviewer_ID_Name`, this.httpOptionsWithKey);
  }
  ProgramDropDown(): Observable<ObjectIDName[]> {
    let result = this.http.get<ObjectIDName[]>(`${environment.Server_URL}/programs/getprogram_id_name`, this.httpOptionsWithKey);
    return result;
  }
  ProgramRelatedDropDown(ID:number): Observable<ObjectIDName[]> {
    let result = this.http.get<ObjectIDName[]>(`${environment.Server_URL}/programs/getprogramidname_withcategoryid?ID=${ID}`, this.httpOptionsWithKey);
    return result;
  }
  SeasonsDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/season/getseason_id_name`, this.httpOptionsWithKey);
  }
  
  SeasonsRelatedDropDown(ID:number): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/season/getseasonidname_withprogramid?ID=${ID}`, this.httpOptionsWithKey);
  }
  EpisodeDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/episodes/episode_id_name`, this.httpOptionsWithKey);
  }
  EpisodeRelatedDropDown(ID:number): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/episodes/getepisode_id_name?ID=${ID}`, this.httpOptionsWithKey);
  }
  PlacementDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/ADS/getplacement_id_name`, this.httpOptionsWithKey);
  }
  TargetDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/ADTargets/gettarget_id_name`, this.httpOptionsWithKey);
  }
  StyleDropDown(): Observable<ObjectIDName[]> {
    return this.http.get<ObjectIDName[]>(`${environment.Server_URL}/AdStyles/getstyle_id_name`, this.httpOptionsWithKey);
  }
  ClientDropDown(): Observable<ObjectIDNameClient[]> {
    return this.http.get<ObjectIDNameClient[]>(`${environment.Server_URL}/ADS/getclient_id_name`, this.httpOptionsWithKey);
  }
  //#endregion

//#region Slider
GetSlider(): Observable<CollectionData<Slider>> {
  return this.http.get<CollectionData<Slider>>(`${environment.Server_URL}/Slider/getallslidersapikey`, this.httpOptionsWithKey);
}

//this._APIService.EditSlider(this.ImageUpdate, this.ProgramTypeId, this.ProgramTypeTitle).subscribe(
  EditSlider(Img: FormData, Id: number, Title: string,EpisodeID:number): Observable<ProgramTypeUpdate> {
    return this.http.put<ProgramTypeUpdate>(`${environment.Server_URL}/Slider/putslider?SliderId=${Id}&SliderTitle=${Title}&EpisodeID=${EpisodeID}`, Img);
  }


//#endregion

}
