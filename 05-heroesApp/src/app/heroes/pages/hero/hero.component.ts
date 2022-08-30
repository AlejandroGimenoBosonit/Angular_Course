import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroComponent implements OnInit {

  hero!: Heroes;

  // To read URL
  constructor( 
    private activatedRoutes : ActivatedRoute,
    private heroesService   : HeroesService,
    private router          : Router  
  ) { }

  ngOnInit(): void {
    this.activatedRoutes.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById(id) )
      )
      .subscribe( hero => this.hero = hero )
  }

  // methods
  backToList() {
    this.router.navigate(['/heroes/list']);
  }

}
