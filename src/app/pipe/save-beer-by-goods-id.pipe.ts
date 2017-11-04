import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saveBeerByGoodsId'
})
export class SaveBeerByGoodsIdPipe implements PipeTransform {
  validItem:Array<any>;
  transform(items: any[], filter: number): any {
    if(!items || !filter) {
      return items;
    }
    this.validItem=items.filter(item => item['goodsId']==filter)[0]['value']
    if(this.validItem){
      return this.validItem
    }else{
      return false;
    }
  }
}
