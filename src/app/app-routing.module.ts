import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayComponent } from './display/display.component';
import { DragComponent } from './drag/drag.component';
import { ExamComponent } from './exam/exam.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"schedule",component:ScheduleComponent},
  {path:"dashboard",component:DashboardComponent,children:[
    {path:"display",component:DisplayComponent}
  ]},
  {path:"exam",component:ExamComponent},
  {path:"drag",component:DragComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
