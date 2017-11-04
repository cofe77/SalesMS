import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsType'
})
export class GoodsTypePipe implements PipeTransform {
  validItem:Array<any>;
  transform(items: any[], filter: number): any {
    if(!items || !filter) {
      return items;
    }
    return this.validItem=items.filter(item => item['id']==filter)[0]['name']
  }
}


