import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class VipService {
  ipPort:string='/vip';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }

  getAllVip(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
  login(data){
    return this.http.post(this.ipPort+'/getVip',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getVipInfo(id){
    return this.http.post(this.ipPort+'/getVip',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  search(data){
    return this.http.post(this.ipPort+'/getByParams',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  createVip(data){
    return this.http.post(this.ipPort+'/createVip',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  vipCharge(data){
    return this.http.post(this.ipPort+'/vipCharge',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  update(data){
    return this.http.post(this.ipPort+'/update',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  resetPassword(data){
    return this.http.post(this.ipPort+'/resetPassword',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  delete(id){
    return this.http.post(this.ipPort+'/delete',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
}
