import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {GoodsImageCropperDialogComponent} from "../goods-image-cropper-dialog/goods-image-cropper-dialog.component";
import {AddGoodsTypeComponent} from "../add-goods-type/add-goods-type.component";
import {GoodsTypeService} from "../../../service/goods-type.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {GoodsService} from "../../../service/goods.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {LoadingDialogComponent} from "../../layer/loading-dialog/loading-dialog.component";

@Component({
  selector: 'app-add-or-update-goods-dialog',
  templateUrl: './add-or-update-goods-dialog.component.html',
  styleUrls: ['./add-or-update-goods-dialog.component.css'],
  providers:[GoodsTypeService,GoodsService]
})
export class AddOrUpdateGoodsDialogComponent implements OnInit {
  action:string;
  isAddNew:boolean=false;
  goodsImgUrl:string;
  goodsImgHandle:string;
  goodsId:string;
  name:string;
  goodsImgBase64:string;
  hadSelectImg:string='';
  goodsTypes:Array<any>;
  goodss:Array<any>;
  goodsNameIsExist:boolean=false;
  goods:Array<any>;
  goodsForm:FormGroup;

  constructor(@Inject(MD_DIALOG_DATA) public dialogData:any,
              private dialog:MdDialog,
              public goodsTypeService:GoodsTypeService,
              public goodsService:GoodsService,
              public toastr:ToastrService,
              public addOrUpdateGoodsDialogRef:MdDialogRef<AddOrUpdateGoodsDialogComponent>,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.goodsImgHandle='请选择图片';
    this.goodsId=this.dialogData['goodsId'];
    this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>this.goodsTypes=data.slice(1),error=>this.toastr.error('获取商品类别失败！'));
    this.goodsService.getAllGoods({}).subscribe(data=>this.goodss=data.slice(1),error=>this.toastr.error('获取商品失败！'));
    this.goodsForm = this.fb.group({
      goodsName: ['', [Validators.required] ],
      price: ['', [Validators.required] ],
      describe: ['', [Validators.required] ],
      typeId: ['', [Validators.required] ]
    });
    if(this.action==='修改商品信息'){
      this.isAddNew=true;
      this.goodsService.getGoodsById(this.goodsId).subscribe(data=>{
        this.goods=data;
        this.goodsForm.setValue({
          goodsName: this.goods['name']||'',
          price: this.goods['price']||'',
          describe: this.goods['describe']||'',
          typeId: this.goods['typeId']||''
        });
        this.goodsImgUrl=this.goods['photoUrl'];
      },error=>this.toastr.error('获取商品信息失败！'));
    }
  }

  checkGoodsNameIsExist(){
    for(var i in this.goodss){
      if(this.goodss[i]['name']==this.goodsForm.value.goodsName.replace(/(^\s*)|(\s*$)/g,"")){
        this.goodsNameIsExist=true;
        return;
      }else{
        this.goodsNameIsExist=false;
      }
    }
  }


  imageCropper(){
    let goodsImageCropperDialogRef=this.dialog.open(GoodsImageCropperDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "600px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "商品图片选择"
      }
    } as MdDialogConfig)
    goodsImageCropperDialogRef.afterClosed().subscribe(result=>{
      if(!!result){
        this.goodsImgBase64=result;
        this.goodsImgUrl=this.goodsImgBase64;
        result=result.substring(22);
        var equalIndex= result.indexOf('=');
        if(result.indexOf('=')>0)
        {
          result=result.substring(0, equalIndex);
        }
        var strLength=result.length;
        var fileLength=Math.floor(3*strLength/4);
        var fileLength1=Math.floor(strLength-(strLength/8)*2);
        this.goodsImgHandle='重新选择';
        this.hadSelectImg='已选择图片'
      }
    });

  }

  viewOldImg(){

  }

  addGoodsType(){
    let addGoodsTypeRef=this.dialog.open(AddGoodsTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加商品类别"
      }
    } as MdDialogConfig);
    addGoodsTypeRef.afterClosed().subscribe((res)=>{
      this.goodsTypeService.addGoodsType(res).subscribe((res)=>{
        if(res){
          this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>{
            this.goodsTypes=data.slice(1);
            this.toastr.success('添加商品类别成功！')
          },error=>this.toastr.error('获取商品类别失败！')
          );
        }
      });
    })
  }

  addGoodsConfirm(){
    if(this.goodsForm.invalid){
      return;
    }else{
      if(this.goodsForm.value.typeId=='==请选择商品分类==') {
        this.dialog.open(ConfirmDialogComponent, {
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content": '请选择商品类型！'
          }
        } as MdDialogConfig);
      }else{
        if(!this.goodsImgBase64){
          this.dialog.open(ConfirmDialogComponent,{
            "panelClass": "custom-overlay-pane-class",
            "hasBackdrop": true,
            "backdropClass": "",
            "width": "280px",
            "height": "auto",
            "disableClose": false,
            "data": {
              "action": "警告",
              "content":'请选择商品图片！'
            }
          } as MdDialogConfig);
        }else{
          var data={
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val()),
            "photo":this.goodsImgBase64.split(",")[1]
          };
          let loadingDialogRef=this.dialog.open(LoadingDialogComponent,{
            "panelClass": "custom-overlay-pane-class",
            "hasBackdrop": true,
            "backdropClass": "",
            "width": "280px",
            "height": "auto",
            "disableClose": false,
            "data": {
            }
          } as MdDialogConfig);
          this.goodsService.addGoods(data).subscribe((res)=>{
            if(res){
              loadingDialogRef.close();
              this.addOrUpdateGoodsDialogRef.close(true);
            }else{
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "280px",
                "height": "auto",
                "disableClose": false,
                "data": {
                  "action": "警告",
                  "content":'保存失败！'
                }
              } as MdDialogConfig);
            }
          },error=>this.toastr.error('服务器错误！请稍后重试！'));
        }
      }
    }


  }

  updateGoodsConfirm() {
    if (this.goodsForm.invalid) {
      return;
    } else {
      if (this.goodsForm.value.typeId == '==请选择商品分类==') {
        this.dialog.open(ConfirmDialogComponent, {
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content": '请选择商品类型！'
          }
        } as MdDialogConfig);
      } else {
        var data;
        if (!this.goodsImgBase64) {
          data = {
            "id": this.goodsId,
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val())
          };
        } else {
          data = {
            "id": this.goodsId,
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val()),
            "photo": this.goodsImgBase64.split(",")[1]
          };
        }
        this.goodsService.updateGoods(data).subscribe((res)=> {
          if (res) {
            this.addOrUpdateGoodsDialogRef.close(true);
          } else {
            this.toastr.error('修改失败！');
          }
        }, error=>this.toastr.error('修改失败！'));
      }

    }
  }

}
