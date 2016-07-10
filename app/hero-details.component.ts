import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Hero } from './hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-details',
    templateUrl: 'app/hero-details.component.html',
    styleUrls: ['app/hero-details.component.css']
})

export class HeroDetailsComponent implements OnInit, OnDestroy {

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService) { }

    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    sub: any;
    navigated = false;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.heroService.getHero(id)
                    .then(hero => this.hero = hero);
            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }

    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }
}