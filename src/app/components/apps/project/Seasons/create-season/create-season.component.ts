import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/ApiServices/api.service';
import { ObjectIDName } from 'src/app/Models/object-id-name';
import { SeasonModel } from 'src/app/Models/season-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.component.html',
  styleUrls: ['./create-season.component.scss']
})
export class CreateSeasonComponent implements OnInit {

    //#region Constructor
    constructor(private _APIService: APIService, private router: Router) {
      this.clickEventSuscriptionCat = this._APIService.getClickEvent().subscribe(
        () => { this.EditSeason(); });
    }
    //#endregion

    //#region Declare Varaibles
    RegisterForm: FormGroup;
    FormDataImage: FormData = new FormData();
    _SeasonModel: SeasonModel = this._APIService._SeasonModel;
    clickEventSuscriptionCat: Subscription;
    FlagUpdate: boolean;
    DefaultSelectType: string;

    SessionId: number;
    SessionTitle: string;
    ProgramId: number;
    SeasonViews: number;
    ProgramName: string;
    selectedProgram: string;
    _ProgramIDName: ObjectIDName[];

    //#endregion

    //#region ngOnInit
    ngOnInit() {

      this.DefaultSelectType = "أختر البرنامج من القائمة";

      this.RegisterForm = new FormGroup({
        SessionTitle: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)]),
        // SeasonViews: new FormControl('', [
        //   Validators.required],),
        ProgramName: new FormControl('', [
          Validators.required],
        ),
      });

      this.FlagUpdate = false;
      this.EditSeason();
      this.ProgramDropDown();
    }
    //#endregion

    //#region Alerts
    InsertAlert() {
      Swal.fire('تم إضافة الموسم بنجاح   ')
    }

    InsertAlertError() {
      Swal.fire('حدث خطأ ما برجاء المحاولة مرة أخرى  ')
    }

    UpdateAlert() {
      Swal.fire('تم تعديل الموسم  بنجاح  ')
    }
    //#endregion

    //#region Categories DropDown
    ProgramDropDown() {
      this._APIService.ProgramDropDown().subscribe(
        (data) => {
          this._ProgramIDName = data;
          this._ProgramIDName = this._ProgramIDName.filter(x => x.ID !== this._APIService._SeasonModel.ProgramId);
        },
        (err) => { }
      );
    }
    //#endregion

    //#region Invoke Insert Program Type API -------
    InsertSeason() {
      let Title = this.RegisterForm.controls.SessionTitle.value;
      let Views = 0;
      let ProgramId = this.RegisterForm.controls.ProgramName.value;


      this._APIService.InsertSeason(Title, Views, ProgramId).subscribe(
        data => {
          this.router.navigateByUrl('project/Seasons');
          this.InsertAlert();
        },
        (err) => {
          this.InsertAlertError();

        });
    }
    //#endregion

    //#region Edit Operation
    EditSeason() {

      if (this._APIService._SeasonModel.SessionTitle != null) {
        this.FlagUpdate = true;

        this.SessionId = this._APIService._SeasonModel.SessionId;
        this.SeasonViews = this._APIService._SeasonModel.SeasonViews;
        this.SessionTitle = this._APIService._SeasonModel.SessionTitle;
        this.ProgramId = this._APIService._SeasonModel.ProgramId;
        this.ProgramName = this._APIService._SeasonModel.ProgramName;

        this.DefaultSelectType = this.ProgramName;

      }
    }
    //#endregion

    //#region Update Operation
    UpdateSeason() {
      this._APIService.EditSeason(this.SessionId, this.ProgramId, this.SessionTitle, this.SeasonViews).subscribe(
        data => {
          this.router.navigateByUrl('project/Seasons');
          this.UpdateAlert()
        },
        (err) => {
          this.InsertAlertError();

        });
    }
    //#endregion

    //#region Cancel Operation
    CancelOperation() {

      this.FlagUpdate = false;
      this.SessionId = null;
      this.SessionTitle = null;
      this.SeasonViews = null;
      this.ProgramId = null;
      this.ProgramName = null;

      this._APIService._SeasonModel.SessionId = null;
      this._APIService._SeasonModel.SessionTitle = null;
      this._APIService._SeasonModel.SeasonViews = null;
      this._APIService._SeasonModel.ProgramId = null;
      this._APIService._SeasonModel.ProgramName = null;

      this.DefaultSelectType = "أختر البرنامج من القائمة";
      this.router.navigateByUrl('project/Seasons');
    }
    //#endregion

    //#region selected Category handler
    selectChangeHandler(event: any) {
      this.selectedProgram = event.target.value;
    }
    //#endregion

  }
