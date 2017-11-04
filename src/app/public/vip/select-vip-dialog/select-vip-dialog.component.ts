import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {PasswordDialogComponent} from "../../layer/password-dialog/password-dialog.component";
import {VipService} from "../../../service/vip.service";
import {ToastrService} from "ngx-toastr";
import {VipTypeService} from "../../../service/vip-type.service";
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-select-vip-dialog',
  templateUrl: './select-vip-dialog.component.html',
  styleUrls: ['./select-vip-dialog.component.css'],
  providers:[VipService,VipTypeService]
})
export class SelectVipDialogComponent implements OnInit {

  vips;
  vipTypes;
  vipsCount;
  vipsPage;
  currentVipsPage;
  vipsPageArray;
  searchData;
  vipSearchIsFinished:boolean=false;
  constructor(
    public dialog:MdDialog,
    public vipService:VipService,
    public vipTypeService:VipTypeService,
    public toastr:ToastrService,
    public dialogRef:MdDialogRef<SelectVipDialogComponent>
  ) { }

  ngOnInit() {
    this.vipTypeService.getAllVipTypes({}).subscribe((res)=>{
      this.vipTypes=res.slice(1);
    },err=>this.toastr.error('获取VIP等级失败！请重试！'));
  }
  searchVip(val){
    var data;
    var re=/^1[0-9]{10,10}$/g;
    if(val===''){
      return;
    }else if(re.test(val)){
      data={"mobileNum":val}
    }else {
      data = {"name": val}
    }
    this.searchData=data;
    this.initVipsInfo(1);
  }

  initVipsInfo(page){
    this.currentVipsPage=page;
    var data=$.extend(true,{"row":12,"page":parseInt(page)},this.searchData);
    this.vipService.search(data).subscribe((res)=>{
      if(!!res){
        if(res[0]['count']==0){
          this.vipSearchIsFinished=false;
          this.toastr.error('无搜索结果！')
        }else if(res[0]['count']<=12){
          this.vipSearchIsFinished=false;
        }else{
          this.vipSearchIsFinished=true;
        }
        this.vipsCount=res[0]['count'];
        this.vips=res.slice(1);
        this.vipsPage=Math.ceil(this.vipsCount/12);
        var tempArray=[];
        for(var i=1;i<=this.vipsPage;i++){
          tempArray.push(''+i);
        }
        this.vipsPageArray=tempArray;
      }
    },err=>this.toastr.error('搜索失败！请重试！'));
  }

  selectVipConfirm(e,mobileNum){
    var vipTypeName=$(e.target.parentNode.parentNode.children[2]).text();
    let vipPasswordConfirmRef=this.dialog.open(PasswordDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        'action':'请输入VIP密码'
      }
    } as MdDialogConfig);
    vipPasswordConfirmRef.afterClosed().subscribe((res)=>{
      if(!!res){
        this.vipService.login({"mobileNum":mobileNum,"password":res}).subscribe((data)=>{
          if(!data['isSuccess']){
            this.toastr.error('密码错误！')
          }else{
            this.toastr.success('验证成功！');
            this.dialogRef.close($.extend(true,data,{"typeName":vipTypeName}));
          }
        },err=>this.toastr.error('VIP验证出错！'));
      }
    })
  }

}
