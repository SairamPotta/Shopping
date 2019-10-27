import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    
    args = args.toLowerCase();

    return value.filter((val) => (val.title).toLowerCase().includes(args));
  }

}
