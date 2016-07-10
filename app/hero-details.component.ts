import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
        private heroService: HeroService,
    ) { }

    @Input()
    hero: Hero;
    sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.heroService.getHero(id).then(hero => this.hero = hero);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBack() {
        window.history.back();
    }
}