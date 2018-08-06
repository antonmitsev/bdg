import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Button } from '../button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public key: Button;

  constructor() { 
  }

  ngOnInit() {
  }


}
