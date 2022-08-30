import { Component, Input, OnInit } from '@angular/core';
import { DbzService } from '../services/dbz.service';
import { Character } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: []
})
export class CharactersComponent implements OnInit {

  // We want to associate childCharacters with the parent module's characters
  // @Input() childCharacters: any[] = [];

  // get characters from service
  get characters(): Character[]{
    return this.dbzService.characters;
  }

  ngOnInit(): void {
  }

  constructor(private dbzService:DbzService) {}
}
