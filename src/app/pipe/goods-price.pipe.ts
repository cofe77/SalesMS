import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsPrice'
})
export class GoodsPricePipe implements PipeTransform {
  validItem:Array<any>;
  transform(items: any[], filter: number): any {
    if(!items || !filter) {
      return items;
    }
    return this.validItem=items.filter(item => item['userId']==filter)[0]['price']
  }
}
