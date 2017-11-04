import { Component, OnInit } from '@angular/core';
import {WineService} from "../../../service/wine.service";
import {ToastrService} from "ngx-toastr";
import {MdDialog, MdDialogRef} from "@angular/material";
import {GoodsService} from "../../../service/goods.service";

@Component({
  selector: 'app-select-saved-beer',
  templateUrl: './select-saved-beer.component.html',
  styleUrls: ['./select-saved-beer.component.css'],
  providers:[WineService,GoodsService]
})
export class SelectSavedBeerComponent implements OnInit {
  savedBeer;
  savedBeersLists;
  allGoods;
  constructor(public dialog:MdDialog,
              public wineService:WineService,
              public goodsService:GoodsService,
              public toastr:ToastrService,
              public dialogRef:MdDialogRef<SelectSavedBeerComponent>
  ) { }

  ngOnInit() {
    this.goodsService.getAllGoods({}).subscribe((res)=>{
      this.allGoods=res.slice(1);
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  searchSavedBeerByKeyCode(keyCode){
    this.wineService.getByKeyCode({"keyCode":keyCode}).subscribe((res)=>{
      if(!!res){
        this.savedBeer=res;
      }else{
        this.toastr.error('获取存酒失败！')
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  selectSavedBeerConfirm(){
    this.dialogRef.close(this.savedBeer)
  }

}
