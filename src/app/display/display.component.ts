import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  userObj;

  constructor(private us:UserService) { }

  ngOnInit(): void {
    let username = localStorage.getItem("username");
    console.log(username)
    this.userObj=this.us.getUser(username).subscribe(
      res=>{
        if(res["message"]=="success"){
          this.userObj=res["user"]
          console.log(this.userObj)
        }
        else{
          alert(res["message"])
          
        }
        
        
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }

}
