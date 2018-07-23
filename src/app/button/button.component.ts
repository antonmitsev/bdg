import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public key: object;
  @Output() keyPress = new EventEmitter<string>();

  press(key) {
    this.keyPress.emit(key);
  }

  constructor() { 
  }

  ngOnInit() {
  }


}
