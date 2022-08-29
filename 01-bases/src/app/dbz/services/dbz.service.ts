/*
Components shouldn't fetch or save 
data directly and they certainly shouldn't 
knowingly present fake data. They should focus
on presenting data and delegate data access to a service.
*/

import { Injectable } from "@angular/core";

// T ypescript interfaces
import { Character } from "../interfaces/dbz.interface";

@Injectable()

export class DbzService {
    // we declare a characters array to store them
    // declared as private to protect this array
    private _characters: Character[] = [
        {
            name: 'Goku',
            power: 20000
        },
        {
            name: 'Vegeta',
            power: 19000
        }
    ]; 
    
    get characters(): Character[]{
        // break the reference to protect our data 
        return [...this._characters];
    }

    constructor(){
        console.log("Service Initialized");
    }

    // methods
    addCharacter(characterToAdd: Character){
        // we want to edit our private data
        this._characters.push(characterToAdd);
    }
}