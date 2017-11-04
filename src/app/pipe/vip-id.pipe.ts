import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vipId'
})
export class VipIdPipe implements PipeTransform {

  transform(value: string): any {

  }

}
