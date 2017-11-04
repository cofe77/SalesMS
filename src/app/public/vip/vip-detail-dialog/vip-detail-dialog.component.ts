import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {VipService} from "../../../service/vip.service";
import {VipTypeService} from "../../../service/vip-type.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vip-detail-dialog',
  templateUrl: './vip-detail-dialog.component.html',
  styleUrls: ['./vip-detail-dialog.component.css'],
  providers:[VipService,VipTypeService]
})
export class VipDetailDialogComponent implements OnInit {
  vipId;
  vipName;
  vipTypeId;
  allVipTypes;
  vipMobileNum;
  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public vipService:VipService,
    public toastr:ToastrService,
    public vipTypeService:VipTypeService
  ) {
    this.vipId=this.data['vipId'];
    this.vipTypeService.getAllVipTypes({}).subscribe((res)=>{
      if(!!res){
        this.allVipTypes=res.slice(1);
      }else{
        this.toastr.error('获取VIP类别信息失败！')
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
    this.vipService.getById(this.vipId).subscribe((res)=>{
      if(!!res){
        this.vipName=res['name'];
        this.vipTypeId=res['typeId'];
        this.vipMobileNum=res['mobileNum'];
      }else{
        this.toastr.error('获取VIP信息失败！')
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
  }

  ngOnInit() {

  }

}
