import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userObj;
  username;
  constructor(private r:Router,private us:UserService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    console.log(this.username)
    
  }
  onSubmit(formRef:any){
    let userObj=formRef.value;
    userObj.username=this.username
    this.us.AddList(userObj).subscribe(
      res=>{
        if(res["message"]=="list added"){
          
          alert("list added")
          
          
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



   
 
     
      

  logout(){

    //clear localstorege
    localStorage.clear();

    //Navigate to Home Component
    this.r.navigateByUrl("/home");
  }

}
