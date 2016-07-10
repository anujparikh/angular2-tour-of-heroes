import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailsComponent } from './hero-details.component';
import { HeroService} from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    providers: [],
    directives: [HeroDetailsComponent],
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css'],
    templateUrl: 'app/heroes.component.html'
})

export class HeroesComponent implements OnInit{
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];
    constructor(
        private heroService: HeroService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    gotoDetail() {
        this.router.navigate(['/details', this.selectedHero.id]);
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
}