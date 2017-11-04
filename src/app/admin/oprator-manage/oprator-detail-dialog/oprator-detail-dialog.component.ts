import {Component, OnInit, Inject} from '@angular/core';
import {OperatorService} from "../../../service/operator.service";
import {MD_DIALOG_DATA} from "@angular/material";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-oprator-detail-dialog',
  templateUrl: './oprator-detail-dialog.component.html',
  styleUrls: ['./oprator-detail-dialog.component.css'],
  providers:[OperatorService]
})
export class OpratorDetailDialogComponent implements OnInit {
  operatorId;
  operatorName;
  operatorMobileNum;
  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public toastr:ToastrService,
    public operatorService:OperatorService
  ) {
    this.operatorId=this.data['operatorId']
  }

  ngOnInit() {
    this.operatorService.getOperatorById(this.operatorId).subscribe((res)=>{
      if(!!res){
        this.operatorName=res['name'];
        this.operatorMobileNum=res['mobileNum'];
      }else{
        this.toastr.error('获取操作员信息失败！')
      }
    },err=>this.toastr.error('服务器错误！请重试！'))
  }

}
