import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";

@Injectable()
export class GoodsService {
  ipPort:string='/goods';
  // ipPort:string='salesms.com';
  private headers = new Headers({"content-type":"application/json;charset=utf-8","withCredentials":true});
  public timeOutTime=10000;
  constructor(public http:Http) { }

  getAllGoods(data){
    return this.http.post(this.ipPort+'/getAll',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getAllOldGoods(data){
    return this.http.post(this.ipPort+'/getAllOlds',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  searchGoods(data){
    return this.http.post(this.ipPort+'/getByParams',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  addGoods(data){
    return this.http.post(this.ipPort+'/save',data,{headers:this.headers}).timeout(20000).map((res)=>res.json());
  }

  updateGoods(data){
    return this.http.post(this.ipPort+'/update',data,{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getGoodsById(id){
    return this.http.post(this.ipPort+'/getById',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  getGoodsByTypeId(id){
    return this.http.post(this.ipPort+'/getByType',{"typeId":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

  deleteGoods(id){
    return this.http.post(this.ipPort+'/delete',{"id":id},{headers:this.headers}).timeout(this.timeOutTime).map((res)=>res.json());
  }

}
