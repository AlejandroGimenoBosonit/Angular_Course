import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'image',
  // want to change with every argument update - Pipe pure or not
  // pure: false
})
export class ImagePipe implements PipeTransform {

  transform(hero: Heroes): string {
    if( !hero.id || hero.alt_img === "") {
      return `assets/no-image.png`;
    }else if(hero.alt_img){
      return hero.alt_img
    } else {
      return `assets/heroes/${hero.id}.jpg`;
    }
  }

}
