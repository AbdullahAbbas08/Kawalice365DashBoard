import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { ProjectRoutingModule } from './project-routing.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {FormsModule} from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { ProgramsComponent } from './Programs/programs/programs.component';
import { CreateProgramComponent } from './Programs/create-program/create-program.component';
import { SeasonsComponent } from './Seasons/seasonsList/seasons.component';
import { CreateSeasonComponent } from './Seasons/create-season/create-season.component';
import { ProgramTypeListComponent } from './ProgramTypes/program-type-list/program-type-list.component';
import { CreateProgramTypeComponent } from './ProgramTypes/create-program-type/create-program-type.component';
import { EpisodesListComponent } from './Episodes/episodes-list/episodes-list.component';
import { CreateEpisodeComponent } from './Episodes/create-episode/create-episode.component';
import { InterviewerListComponent } from './Interviewers/interviewer-list/interviewer-list.component';
import { CreateInterviewerComponent } from './Interviewers/create-interviewer/create-interviewer.component';
import { AdvertismentComponent } from './ADS/advertisment/advertisment.component';
import { CreateAdvertismentComponent } from './ADS/create-advertisment/create-advertisment.component';
import { TargetComponent } from './Target/target/target.component';
import { CreateTargetComponent } from './Target/create-target/create-target.component';
import { StyleAdsComponent } from './AdsStyle/style-ads/style-ads.component';
import { CreateStyleAdsComponent } from './AdsStyle/create-style-ads/create-style-ads.component';
import { PlacementComponent } from './Placement/placement/placement.component';
import { PlacementInsertComponent } from './Placement/placement-insert/placement-insert.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotificationsComponent } from './Notifications/notifications/notifications.component';
import { NotificationsInsertComponent } from './Notifications/notifications-insert/notifications-insert.component';
import { SlidersComponent } from './sliders/sliders.component';
import { SliderUpdateComponent } from './sliders/slider-update/slider-update.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule ,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: 
  [ProjectListComponent,
    CreateProjectComponent ,
    DialogExampleComponent, 
    ProgramsComponent, 
    CreateProgramComponent, 
     SeasonsComponent, 
     CreateSeasonComponent,
      ProgramTypeListComponent,
      CreateProgramTypeComponent,
      EpisodesListComponent,
      CreateEpisodeComponent,
      InterviewerListComponent,
      CreateInterviewerComponent,
      AdvertismentComponent,
      CreateAdvertismentComponent,
      TargetComponent,
      CreateTargetComponent,
      StyleAdsComponent,
      CreateStyleAdsComponent,
      PlacementComponent,
      PlacementInsertComponent,
      NotificationsComponent,
      NotificationsInsertComponent,
      SlidersComponent,
      SliderUpdateComponent  ]
})
export class ProjectModule { }
