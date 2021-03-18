import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }
  //user registration
 createUser(formData):Observable<any>{
  return this.hc.post("/user/register",formData);
}
loginUser(userCredObj):Observable<any>{
  return this.hc.post("/user/schedule",userCredObj);
}
AddList(userObj):Observable<any>{
  return this.hc.post("/user/dashboard",userObj);
}
/*DisplayList(userobj):Observable<any>{
  return this.hc.get("/user/getuser",userobj)

}*/
getUser(username):Observable<any>{
  return this.hc.get("/user/display",username)
}
}
