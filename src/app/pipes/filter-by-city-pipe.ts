// pipes/filter-by-city.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCity',
  standalone: false
})
export class FilterByCityPipe implements PipeTransform {

  transform(users: any[], cityFilter: string): any[] {
    if (!users || !cityFilter) {
      return users;
    }

    const filter = cityFilter.toLowerCase();
    return users.filter(user =>
      user.address.city.toLowerCase().includes(filter)
    );
  }
}
