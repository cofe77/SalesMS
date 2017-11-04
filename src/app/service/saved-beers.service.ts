import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class SavedBeersService {
  ipPort:string='/savedBeers';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }

  create(data){
    return this.http.post(this.ipPort+'/create',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getKeyCodeImage(id){
    return this.http.post(this.ipPort+'/getKeyCodeImage',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  add(data){
    return this.http.post(this.ipPort+'/add',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

}
