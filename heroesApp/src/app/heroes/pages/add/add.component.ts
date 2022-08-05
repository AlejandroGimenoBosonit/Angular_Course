import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { config, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 50%;
      border-radius: 5px;
    }
  `]
})
export class AddComponent implements OnInit {

  // select Options 
  selectPublishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  // hero model
  hero: Heroes = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  // To read URL
  constructor( 
      private router          : Router,
      private activatedRoutes : ActivatedRoute,
      private heroesService   : HeroesService,
      private snackBar        : MatSnackBar,
      private matDialog       : MatDialog 
    ) { }

  ngOnInit(): void {
    // extract url id ONLY if id includes 'edit' word
    if(!this.router.url.includes('edit')) return;

    this.activatedRoutes.params
        .pipe(switchMap( ({ id }) => this.heroesService.getHeroById( id ) ))
        .subscribe( hero => this.hero = hero)
  }

  //  methods
  saveMethod() {
    if(this.hero.superhero.trim().length === 0) return;

    // Check for id -> edit mode
    if(this.hero.id){
      // Update - Put
      this.heroesService
          .updateHero( this.hero )
          .subscribe( updatedHero => this.displaySnackBar(`${updatedHero.superhero} moddified successfully!`) )
      
    }else{
      // Add - Post
      this.heroesService
        .postHero( this.hero )
        .subscribe( addedHero => {
          // display skackbar
          this.displaySnackBar(`${addedHero.superhero} added to the database!`)
          // navigate to heroe's page
          this.router.navigate( ['/heroes/edit', addedHero.id] )
        });
    }
  }

  deleteMethod() {  
    // Ask for deleting by dialog calling a custom component
    this.matDialog
        .open( ConfirmComponent, { 
          width: '500px',
          // data with spread operator to protect our info (read-only)
          data: {...this.hero }
        })
        .afterClosed()
        .pipe(switchMap( result => (result) ? this.heroesService.deleteHero(this.hero.id!) : null!))
        .subscribe( (result) => {
          if(result){
            this.displaySnackBar(`${this.hero.superhero} has been deleted!`);
            this.router.navigate(['/heroes/list']);
          } 
        })    
  }

  displaySnackBar( mssg: string ): void {

    const snackParams = { duration: 2500};

    this.snackBar.open( mssg, 'Ok!', snackParams );
  }
}
