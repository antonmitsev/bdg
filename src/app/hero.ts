export class Hero {
  private date = new Date();
  _id?: string;
  name: string;
  yearMonth: number = this.date.getFullYear() * 100 + this.date.getMonth() + 1;
  predict?: number = 0;
  amount?: number = 0;
  data?: object[];
}
