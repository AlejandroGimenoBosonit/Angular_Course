import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(hero: Heroes): string {
    console.log(hero );

    return hero ? `assets/heroes/${hero.id}.jpg` : `assets/no-image.png`;
  }

}
