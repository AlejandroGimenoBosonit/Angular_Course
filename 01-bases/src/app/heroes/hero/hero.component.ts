import { Component } from "@angular/core";

@Component({
    selector: 'app-hero',
    templateUrl: 'hero.component.html'
})

export class HeroComponent{
    heroName: string = 'Ironman';
    age: number = 45;

    // getter 
    get capitalizedName(): string{
        return this.heroName.toUpperCase();
    }

    method(): string{ 
        return `${this.heroName} - ${this.age}`;
    }

    // button methods
    changeName(): void{
        this.heroName = 'Spiderman';
    }
    changeAge(): void{
        this.age = 23;
    }   
}