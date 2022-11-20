import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'models'
})
export class ModelsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
