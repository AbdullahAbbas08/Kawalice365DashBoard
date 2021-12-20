import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
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
import { CreateTargetComponent } from './Target/create-target/create-target.component';
import { TargetComponent } from './Target/target/target.component';
import { StyleAdsComponent } from './AdsStyle/style-ads/style-ads.component';
import { CreateStyleAdsComponent } from './AdsStyle/create-style-ads/create-style-ads.component';
import { PlacementComponent } from './Placement/placement/placement.component';
import { PlacementInsertComponent } from './Placement/placement-insert/placement-insert.component';
import { NotificationsComponent } from './Notifications/notifications/notifications.component';
import { NotificationsInsertComponent } from './Notifications/notifications-insert/notifications-insert.component';
import { SlidersComponent } from './sliders/sliders.component';
import { SliderUpdateComponent } from './sliders/slider-update/slider-update.component';

const routes: Routes = [
  {
  
    path: '',
    children: [
      {
        path: 'Sliders',
        component: SlidersComponent
      },
      {
        path: 'UpdateSlider',
        component: SliderUpdateComponent
      },
      {
        path: 'list',
        component: ProjectListComponent
      },
      {
        path: 'create',
        component: CreateProjectComponent
      },
      {
        path: 'Programs',
        component: ProgramsComponent
      },
      {
        path: 'createProgram',
        component: CreateProgramComponent
      },
      {
        path: 'Seasons',
        component: SeasonsComponent
      },
      {
        path: 'createSeason',
        component: CreateSeasonComponent
      },
      {
        path: 'ProgramTypes',
        component: ProgramTypeListComponent
      },
      {
        path: 'CreateProgramType',
        component: CreateProgramTypeComponent
      },
      {
        path: 'Episodes',
        component: EpisodesListComponent
      },
      {
        path: 'createEpisode',
        component: CreateEpisodeComponent
      },
      {
        path: 'Interviewers',
        component: InterviewerListComponent
      },
      {
        path: 'createInterviewer',
        component: CreateInterviewerComponent
      },
      {
        path: 'Advertisment',
        component: AdvertismentComponent
      },
      {
        path: 'createAdvertisment',
        component: CreateAdvertismentComponent
      },
      {
        path: 'Target',
        component: TargetComponent
      },
      {
        path: 'createTarget',
        component: CreateTargetComponent
      },
      {
        path: 'Style',
        component: StyleAdsComponent
      },
      {
        path: 'createStyle',
        component: CreateStyleAdsComponent
      },
      {
        path: 'Placement',
        component: PlacementComponent
      },
      {
        path: 'CreatePlacement',
        component: PlacementInsertComponent
      },
      {
        path: 'Notifications',
        component: NotificationsComponent
      },
      {
        path: 'CreateNotification',
        component: NotificationsInsertComponent
      },
    ]  
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
