import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private us:UserService,private r:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef){

    let userCredObj=formRef.value;
    
    //if user
    
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
            
            //store tiken and username in browser's localstorage
            localStorage.setItem("token",res["signedToken"]);
            localStorage.setItem("username",res["username"]);
            
            //navigate to the userdashboard
            this.r.navigateByUrl("/dashboard");
          }
          else{
            alert(res["message"])
          }
        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )

    }

       

  }


