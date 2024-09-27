import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] | null {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    
    return value.filter((item: any) => {
      // Assuming each `item` is an object. Adjust this type according to your data.
      return JSON.stringify(item)
        .toLowerCase()
        .includes(args);
    });
  }
}
