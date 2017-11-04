import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vipType'
})
export class VipTypePipe implements PipeTransform {
  validItem:Array<any>;
  transform(items: any[], filter: number): any {
    if(!items) {
      return items;
    }
    return this.validItem=items.filter(item => item['id']==filter)[0]['name']
  }
}
