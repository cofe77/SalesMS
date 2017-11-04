import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class VipTypeService {
  ipPort:string='/vipType';
  // ipPort:string='salesms.com';

  public timeOutTime=10000;
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});
  constructor(private http:Http) {}

  getAllVipTypes(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
  searchVipTypes(data){
    return this.http.post(this.ipPort+'/getByParams',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getVipTypeById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  deleteVipType(data){
    return this.http.post(this.ipPort+'/delete',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  updateVipType(data){
    return this.http.post(this.ipPort+'/update',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  addVipType(data){
    return this.http.post(this.ipPort+'/save',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

}
