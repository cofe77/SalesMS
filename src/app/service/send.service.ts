import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class SendService {
  ipPort:string='/send';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});

  public timeOutTime=10000;
  constructor(public http:Http) { }

  getDispatch(data){
    return this.http.post(this.ipPort+'/waitSend',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  dispatchIsChanged(data){
    return this.http.post(this.ipPort+'/isChanged',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  send(data){
    return this.http.post(this.ipPort+'/hasSend',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

}
