import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  @Output() emit: EventEmitter<Hero> = new EventEmitter();
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  public save(hero: Hero): void {
    this.emit.emit(hero);
  }

  public ngOnInit() {
    this.getHeroes();
  }

  public getHeroes(): void {
    const date = new Date();
    const month = date.getFullYear() * 100 + (date.getMonth() + 1);
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  public add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
