import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class DeskService {
  ipPort:string='/desk';
  // ipPort:string='salesms.com';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});
  public timeOutTime=10000;
  constructor(private http:Http) { }
  getAllDesks(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  getAllOldDesks(data){
    return this.http.post(this.ipPort+'/getByParamsOlds',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  addDesk(data){
    return this.http.post(this.ipPort+'/save',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  updateDesk(data){
    return this.http.post(this.ipPort+'/update',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  search(data){
    return this.http.post(this.ipPort+'/getByParams',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getDeskDetail(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  getDeskQRCode(id){
    return this.http.post(this.ipPort+'/getKeyCodeImage',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  getUserDeskDetail(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }

  delete(id){
    return this.http.post(this.ipPort+'/delete',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json())
  }



}
