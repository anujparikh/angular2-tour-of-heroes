import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailsComponent } from './hero-details.component';
import { HeroService} from './hero.service';
import { Router } from '@angular/router';

@Component({
    directives: [HeroDetailsComponent],
    selector: 'my-heroes',
    styleUrls: ['app/heroes.component.css', '../sample.css'],
    templateUrl: 'app/heroes.component.html'
})

export class HeroesComponent implements OnInit {
    error: any;
    selectedHero: Hero;
    addingHero = false;
    heroes: Hero[];
    constructor(
        private heroService: HeroService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getHeroes();
    }

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            })
            .catch(error => this.error = error);
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes(); }
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    gotoDetail() {
        this.router.navigate(['/details', this.selectedHero.id]);
    }

    getHeroes() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes)
            .catch(error => this.error = error);
    }
}