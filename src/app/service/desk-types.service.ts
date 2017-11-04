import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class DeskTypesService {
  ipPort:string='/deskType';
  // ipPort:string='salesms.com';

  public timeOutTime=10000;
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});
  constructor(private http:Http) {}

  getAllDeskTypes(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  deleteDeskType(data){
    return this.http.post(this.ipPort+'/delete',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  addDeskType(data){
    return this.http.post(this.ipPort+'/save',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  updateDeskType(data){
    return this.http.post(this.ipPort+'/update',data,{headers: this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
}
