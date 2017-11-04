import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class OperatorService {
  ipPort:string='/operator';
  // ipPort:string='salesms.com';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }

  login(data){
    return this.http.post(this.ipPort+'/login',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
  resetPassword(data){
    return this.http.post(this.ipPort+'/resetPassword',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getAll(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getByParams(data){
    return this.http.post(this.ipPort+'/getByParams',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  addOperator(data){
    return this.http.post(this.ipPort+'/create',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  update(data){
    return this.http.post(this.ipPort+'/update',data,{headers:this.headers}).map((res)=>res.json());
  }

  getOperatorById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  deleteOperator(id){
    return this.http.post(this.ipPort+'/delete',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
}
