import {Component, OnInit, ViewChild, Type, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-goods-image-cropper-dialog',
  templateUrl: './goods-image-cropper-dialog.component.html',
  styleUrls: ['./goods-image-cropper-dialog.component.css']
})
export class GoodsImageCropperDialogComponent implements OnInit {
  action:string;

  constructor(
    public dialogRef: MdDialogRef<GoodsImageCropperDialogComponent>,
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialog:MdDialog
  ) {
  }

  ngOnInit() {
    this.action=this.dialogData['action'];
  }


  selectImg(){
    $('#image').cropper({
      aspectRatio: '1',
      autoCropArea:0.8,
      preview: '.up-pre-after',

    });
    var URL = window.URL;
    var blobURL;

    if (URL) {
      var files = $('#inputImage')[0].files;
      var file;

      if (files && files.length) {
        file = files[0];
        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $('#image').one('built.cropper', function () {
            // Revoke when load complete
            URL.revokeObjectURL(blobURL);
          }).cropper('reset').cropper('replace', blobURL);
          $('#inputImage').val('');
        } else {
          window.alert('请保证您选择的文件格式为图片！');
        }
      }
    } else {
      $('#inputImage')[0].prop('disabled', true).parent().addClass('disabled');
    }

  };

  imageCropperConfirm(){
    var canvas=$("#image").cropper('getCroppedCanvas',{
      width:200,
      height:200
    });
    var data=canvas.toDataURL(); //转成base64
    this.dialogRef.close(data);
  }

}
