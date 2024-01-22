// External dependencies
import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { isValid, formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    // Not a valid date
    if (isValid(value)) {
      return '';
    }

    const date = new Date(value);
    const today = new Date();

    return formatDistance(today, date);
  }
}
