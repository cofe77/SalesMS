import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {GoodsService} from "../../../service/goods.service";

@Component({
  selector: 'app-goods-detail-dialog',
  templateUrl: './goods-detail-dialog.component.html',
  styleUrls: ['./goods-detail-dialog.component.css'],
  providers:[GoodsService]
})
export class GoodsDetailDialogComponent implements OnInit {
  goods={
    "name":'',
    "price":null,
    "describe":'',
    "photoUrl":''
  };
  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public goodsService:GoodsService
  ) {
    this.goodsService.getGoodsById(parseInt(this.dialogData['goodsId'])).subscribe((res)=>{
      if(res){
        this.goods=res;
      }
    });
  }

  ngOnInit() {

  }

}
