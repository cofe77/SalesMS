import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class OrderService {
  ipPort:string='/order';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }

  getAllOldOrder(data){
    return this.http.post(this.ipPort+'/getAllOldsSimple',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getOldOrderByParams(data){
    return this.http.post(this.ipPort+'/getByParamsOldsSimple',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getOldOrderByTime(data){
    return this.http.post(this.ipPort+'/getByParamsOlds',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getOldOrderById(id){
    return this.http.post(this.ipPort+'/getByIdOlds',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getUserOrderById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  addOther(data){
    return this.http.post(this.ipPort+'/addOther',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  finishOrder(data){
    return this.http.post(this.ipPort+'/operatorFinish',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }


}
