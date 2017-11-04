import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  nDate=new Date();
  subMenuYear:string='2017年';
  subMenuMonth:string='请选择月份';
  subMenuGoodsType:string='请选择分类';
  dateTemp:string;
  showloading:boolean = true;
  chartOption;
  goodsRankDate;
  constructor() {
    setTimeout(()=> {
      this.showloading = false;
    }, 1000);
  }

  ngOnInit() {
    this.changeECharts('sevenDays');
  }

  changeECharts(type){
    if(type=='sevenDays'){
      this.chartOption={};
      this.nDate.setDate(this.nDate.getDate() - 7);
      var Days=[];
      var DaysDate=[];
      for(var i=0;i<7;i++){
        this.dateTemp = (this.nDate.getMonth()+1)+"-"+this.nDate.getDate();
        Days.push(this.dateTemp);
        DaysDate.push(Math.floor(Math.random()*1000));
        this.nDate.setDate(this.nDate.getDate() + 1);
      }
    }else if(type=='thirtyDays'){
      this.chartOption={};
      this.nDate.setDate(this.nDate.getDate() - 30);
      var Days=[];
      var DaysDate=[];
      for(var i=0;i<30;i++){
        this.dateTemp = (this.nDate.getMonth()+1)+"-"+this.nDate.getDate();
        Days.push(this.dateTemp);
        DaysDate.push(Math.floor(Math.random()*1000));
        this.nDate.setDate(this.nDate.getDate() + 1);
      }
    }else if(type=='month'){
      this.chartOption={};
      this.nDate.setDate(this.nDate.getDate() - this.nDate.getDate()+1);
      var Days=[];
      var DaysDate=[];
      for(var i=0;i<20;i++){
        this.dateTemp = (this.nDate.getMonth()+1)+"-"+this.nDate.getDate();
        Days.push(this.dateTemp);
        DaysDate.push(Math.floor(Math.random()*1000));
        this.nDate.setDate(this.nDate.getDate() + 1);
      }
    }

    if(Days.length>0){
      this.chartOption= {
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['营业额']
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : Days
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'营业额',
            type:'line',
            stack: '总量',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:DaysDate
          }
        ]
      }
    }
  }


  menuYearSelected(year){
    this.subMenuYear=year;

  }

  menuMonthSelected(month){
    this.subMenuMonth=month;
    this.changeECharts('month');

  }
  menuGoodsTypeSelected(goodsType){
    this.subMenuGoodsType=goodsType;
  }


  addOprator(){

  }
  editOprator(){}
  updateOpratorPassword(){}
  updateOpratorStatus(){}

  wineRank(){
    this.goodsRankDate = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
      {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
      {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
      {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
      {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
      {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
      {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
      {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
      {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
      {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    ]
  }
}
