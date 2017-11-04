import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class WineService {
  ipPort:string='/savedBeers';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }
  getAllOrder(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getByKeyCode(data){
    return this.http.post(this.ipPort+'/getByKeyCode',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }
}
