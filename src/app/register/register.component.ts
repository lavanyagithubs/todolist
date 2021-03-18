import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private r:Router,private us:UserService) { }

  ngOnInit(): void {
  }
  onSubmit(formRef:any){
    let userObj=formRef.value;
    //let formData=new FormData();
     //adding image and other data to ForData object
     //formData.append('photo',this.file,this.file.name);
 
     //formData.append("userObj",JSON.stringify(userObj)) //append() can only take the data in string format so convert the file datawhich is in binary to string
   
 
     this.us.createUser(userObj).subscribe(
       res=>{
         if(res["message"] == "user existed"){
           alert("Username is already existed..choose another");
         }
         if(res["message"] == "user created"){
           alert("Registration succesfull");
 
           //navigate to login component
           this.r.navigateByUrl("/schedule");
         }
       },
       err=>{
         alert("Something went wrong in user creation");
         console.log(err);
       }  
     )
     console.log(formRef.value);
  }

}
