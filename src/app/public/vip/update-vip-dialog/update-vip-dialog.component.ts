import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {AddVipTypeComponent} from "../add-vip-type/add-vip-type.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VipService} from "../../../service/vip.service";
import {ToastrService} from "ngx-toastr";
import {VipTypeService} from "../../../service/vip-type.service";
import {Md5} from "ts-md5/dist/md5";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-update-vip-dialog',
  templateUrl: './update-vip-dialog.component.html',
  styleUrls: ['./update-vip-dialog.component.css'],
  providers:[VipService,VipTypeService]
})
export class UpdateVipDialogComponent implements OnInit {
  action:string;
  isAddNew:boolean=true;
  vipMobileNumIsExist:boolean=false;
  vipForm:FormGroup;
  vipTypes;
  vip;
  vips;
  vipId:number;
  vipName;
  mobileNum;
  typeId;
  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public dialog:MdDialog,
    public toastr:ToastrService,
    public dialogRef:MdDialogRef<UpdateVipDialogComponent>,
    public vipService:VipService,
    public vipTypeService:VipTypeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.action=this.data['action'];
    this.vipId=this.data['vipId'];
    this.vipName=this.data['vipName'];
    this.mobileNum=this.data['mobileNum'];
    this.typeId=this.data['typeId'];
    this.vipService.getAllVip({}).subscribe((res)=>{
      this.vips=res.slice(1);
    },err=>this.toastr.error('获取VIP等级失败！请稍后重试！'));
    this.vipTypeService.getAllVipTypes({}).subscribe((res)=>{
      this.vipTypes=res.slice(1);
    },err=>this.toastr.error('获取VIP等级失败！请稍后重试！'));

    if(this.action==='修改会员信息'){
      this.isAddNew=false;
      this.vipForm = this.fb.group({
        name: ['', [Validators.required] ],
        mobileNum: ['', [Validators.required]],
        typeId: ['', [Validators.required] ]
      });
      this.vipForm.setValue({
        name: this.vipName||'',
        mobileNum: this.mobileNum||'',
        typeId: this.typeId||''
      });
    }else{
      this.isAddNew=true;
      this.vipForm = this.fb.group({
        name: ['', [Validators.required] ],
        mobileNum: ['', [Validators.required]],
        firstPsw: ['', [Validators.required , Validators.minLength(6),
          Validators.maxLength(10)]],
        secondPsw: ['', [Validators.required,Validators.minLength(6),
          Validators.maxLength(10)]],
        typeId: ['', [Validators.required] ]
      });
    }
  }

  addVipType(){
    let AddVipTypeDialogRef=this.dialog.open(AddVipTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加会员等级"
      }
    } as MdDialogConfig);
    AddVipTypeDialogRef.afterClosed().subscribe(result=>{
      if(result!=''){
        this.vipTypeService.addVipType(result).subscribe(data=>{
          if (data){
            this.toastr.success('添加成功！');
            this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
          }else{
            this.toastr.error('添加失败！');
          }
        });
      }
    });
  }

  checkVipMobileNumIsExist(){
    for(var i in this.vips){
      if(this.vips[i]['mobileNum']==this.vipForm.value.mobileNum.replace(/(^\s*)|(\s*$)/g,"")){
        this.vipMobileNumIsExist=true;
        return;
      }else{
        this.vipMobileNumIsExist=false;
      }
    }
  }

  addVipConfirm(){
    if(this.vipForm.invalid){
      return;
    }else{
      if(this.vipForm.value.typeId=='==请选择会员等级=='){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content":'请选择会员等级！'
          }
        } as MdDialogConfig);
      }else{
        var operatorId=JSON.parse($.cookie('idCheck'))['id'];
        var data;
        if(this.isAddNew){
          var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
          var preSecondPasswordStr=$('#secondPsw').val();
          var confoundStrArray=[];
          var secondPasswordArray=[];
          for(var i=0;i<confoundStr.length;i++){
            confoundStrArray.push(confoundStr.charAt(i));
          }
          for(var i=0;i<preSecondPasswordStr.length;i++){
            secondPasswordArray.push(preSecondPasswordStr.charAt(i)+''+confoundStrArray[i]);
          }
          data={
            "name": $("#vipName").val(),
            "mobileNum": parseInt($("#mobileNum").val()),
            "typeId": parseInt($("#typeId").val()),
            "password": secondPasswordArray.join(''),
            "operatorId": Number(operatorId),
            "balance":0
          };
          this.vipService.createVip(data).subscribe((res)=>{
            $('#secondPsw').val('');
            $('#firstPsw').val('');
            if(!!res){
              this.dialogRef.close(true);
            }else{
              this.toastr.error('添加失败！');
            }
          },error=>this.toastr.error('添加失败！'));
        }else{
          data={
            "id": this.vipId,
            "name": $("#vipName").val(),
            "mobileNum": parseInt($("#mobileNum").val()),
            "typeId": parseInt($("#typeId").val())
          };
          this.vipService.update(data).subscribe((res)=>{
            if(!!res){
              this.dialogRef.close(true);
            }else{
              this.toastr.error('修改失败！');
            }
          },error=>{
            $('#secondPsw').val('');
            $('#firstPsw').val('');
            this.toastr.error('修改失败！')
          });
        }
      }
    }


  }

}
