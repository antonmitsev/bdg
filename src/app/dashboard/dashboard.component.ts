import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  @Input() public screen: string;
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    const date = new Date();
    const month = date.getFullYear() * 100 + (date.getMonth() + 1);
    this.heroService.getHeroes('' + month)
      .subscribe(
        (heroes) => {
          this.heroes = heroes;
        });
  }
}
