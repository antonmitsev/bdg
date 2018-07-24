import { Component, OnInit } from '@angular/core';
import { Button } from '../button';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  public keys: Button[];
  public screen: string;

  ngOnInit(){
  }

  public save($event){
    console.log($event, this.screen);
  }

  constructor() {
    this.screen = '0';
    this.keys = [
      {
        text: 'c',
        class: 'c',
        content: this.c
      },
      {
        text: '<=',
        class: 'e1',
        content: this.back
      },
      {
        text: '7'
      },
      {
        text: '8'
      },
      {
        text: '9'
      },
      {
        text: '4'
      },
      {
        text: '5'
      },
      {
        text: '6'
      },
      {
        text: '1'
      },
      {
        text: '2'
      },
      {
        text: '3'
      },
      {
        text: '0',
        class: 'b2'
      },
      {
        text: ',',
        class: 'dot',
        content: this.dot
      }
    ];
  }

  private dot(): void {
    if(this.screen != '' && this.screen.indexOf('.') < 0){
      this.screen += '.';
    }
  }

  private c(): void {
    this.screen = '0';
  }

  private back(): void {
    this.screen = this.screen.slice(0, -1);
    if(this.screen == ''){
      this.screen = '0';
    }
  }

  private num(val: number): void{
    if(this.screen == '0'){
      this.screen = '';
    }
    this.screen += '' + val;
  }

  public getMember(k: string): object {
    return (
      { 
        key: k, 
        keys: this.keys[k] 
      }
    );
  }

  public keyPressed(obj: Button): void {
    if(typeof(obj.content) === 'function'){
      obj.content.apply(this);
    }else{
      this.num(parseInt(0 + obj.text));
    }
  }

}
