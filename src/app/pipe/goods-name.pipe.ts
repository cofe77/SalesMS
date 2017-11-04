import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goodsName'
})
export class GoodsNamePipe implements PipeTransform {
  validItem:Array<any>;
  transform(items: any[], filter: number): any {
    if(!items || !filter) {
      return items;
    }
    return this.validItem=items.filter(item => item['userId']==filter)[0]['name']
  }
}
