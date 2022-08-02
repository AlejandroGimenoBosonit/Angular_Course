import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fly'
})
export class FlyPipe implements PipeTransform {

  transform(isFlying: boolean): string {
    return (isFlying) ? 'can Fly' : 'can\'t Fly'
  }

}
