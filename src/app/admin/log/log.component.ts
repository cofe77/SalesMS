import { Component, OnInit } from '@angular/core';
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {zhCn} from "ngx-bootstrap/bs-moment/i18n/zh-cn";
import {defineLocale} from "ngx-bootstrap";
defineLocale('zh-cn',zhCn);
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  locale = 'zh-cn';
  minDate: Date;
  maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  public bsRangeValue;
  constructor() {
    this.bsConfig = Object.assign({}, {locale: this.locale});
    this.minDate = new Date('2017/09/20');
    this.maxDate = new Date();
  }

  ngOnInit() {
  }

}
