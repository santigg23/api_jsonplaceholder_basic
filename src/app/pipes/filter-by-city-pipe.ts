import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCity',
  standalone: false
})
export class FilterByCityPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
