import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: object[] = [];
  _maxId: number = 0;
  indexes: number[] = [];

  add(message: string) {
    ++ this.maxId;
    this.messages.push({
        id: this.maxId,
        message: message
      }
    );
    this.indexes.push(this.maxId);
    return this.maxId;
  }

  clear() {
    this.messages = [];
  }

  delete(id: number): boolean {
    let index = this.getIndexById(id);
    if(index >= 0){
      this.messages.splice(id, 1);
      return true;
    }
    return false;
  }

  private getIndexById(id: number): number {
    let result = -1;
    this.indexes.forEach(function(value, index){
      if(value === id){
        result = index;
      }
    });
    return result;
  }
  
  private getById(id: number): object {
    return {};//this.getIndexById(id);
  }

  private get maxId(){
    return this._maxId;
  }
  
  private set maxId(value){
    this._maxId = value;
  }
}
