import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  public keys: object;
  public keys2: number [];
  public screen: string;

  constructor() {
    this.screen = '0';
    this.keys = {
      '0': {},
      '1': {},
      '2': {},
      '3': {},
      '4': {},
      '5': {},
      '6': {},
      '7': {},
      '8': {},
      '9': {},
      ',': {
        class: 'dot',
        content: this.dot
      },
      '<=': {
        class: 'back',
        content: this.back
      }
    }
   }
  
  private dot(): void {
    if(this.screen != '' && this.screen.indexOf('.') < 0){
      this.screen += '.';
    }
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

  public keyPressed(key: string): void {
    var obj = this.keys[key];
    if(typeof(obj.content) === 'function'){
      obj.content.apply(this);
    }else{
      this.num(parseInt(0 + key));
    }
  }

   getKeys() : Array<string> {
    return Object.keys(this.keys);
   }

  ngOnInit() {
  }

}
