import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10): string {
    console.log(`Original: ${value}`);
    console.log(`Limit: ${limit}`);
    if (!value) return '';
    if (value.length > limit) {
      const truncated = value.substring(0, limit) + '...';
      console.log(`Truncated: ${truncated}`);
      return truncated;
    } else {
      return value;
    }
  }
}
