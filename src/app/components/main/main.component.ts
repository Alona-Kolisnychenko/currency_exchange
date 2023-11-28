import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public rateUSD!: number;
  public rateEUR!: number;

  public rateUSDEUR!: number;
  public rateEURUSD!: number;

  public selectedCurrency1 = 'USD';
  public selectedCurrency2 = 'UAH';

  public input1 = 0;
  public input2 = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrency();
  }

  async getCurrency() {
    await Promise.all([this.getUSD(), this.getEUR()]);
  }

  getUSD() {
    this.currencyService.get().subscribe((data) => {
      const [usd] = data.filter((el: any) => el.cc === 'USD');
      this.rateUSD = usd.rate;
    });
  }
  getEUR() {
    this.currencyService.get().subscribe((data) => {
      const [eur] = data.filter((el: any) => el.cc === 'EUR');
      this.rateEUR = eur.rate;
    });
  }

  getRate() {
    this.rateUSDEUR = this.rateEUR / this.rateUSD;
    this.rateEURUSD = this.rateUSD / this.rateEUR;
  }

  getCurrentRate(enterCurrency: string, resultCurrency: string){
    if (enterCurrency === 'USD' && resultCurrency === 'UAH') {
      return this.rateUSD;
    } else if (enterCurrency === 'EUR' && resultCurrency === 'UAH') {
      return this.rateEUR;
    } else if (
      enterCurrency === 'USD' &&
      resultCurrency === 'EUR'
    ) {
      return this.rateUSDEUR;
    } else if (
      enterCurrency === 'EUR' &&
      resultCurrency === 'USD'
    ) {
      return this.rateEURUSD;
    } else if (
      enterCurrency === 'UAH' &&
      resultCurrency === 'USD'
    ) {
      return (1 / this.rateUSD);
    } else if (
      enterCurrency === 'UAH' &&
      resultCurrency === 'EUR'
    ) {
      return (1 / this.rateEUR);
    } 
    return 1;
  }

  convertCurrency(rate: number, count: number) {
    const res = count * rate;
    return res;
  }

  changeCount(event: any) {
    this.getRate();
    let count!:number;
    let enterCurrency!: string;
    let resultCurrency!: string;

    if (event.target.name === 'input1') {
      this.input1 = event.target.value;
      enterCurrency = this.selectedCurrency1;
      resultCurrency = this.selectedCurrency2;
      count = event.target.value;
    } else if (event.target.name === 'input2') {
      this.input2 = event.target.value;
      enterCurrency = this.selectedCurrency2;
      resultCurrency = this.selectedCurrency1;
      count = event.target.value;
    } else if(event.target.name === 'currency1'){
      enterCurrency = event.target.value;
      resultCurrency = this.selectedCurrency2;
      count = this.input1;
    } else if(event.target.name === 'currency2'){
      enterCurrency = this.selectedCurrency1;
      resultCurrency = event.target.value;
      count = this.input1;
    }

    const rate = this.getCurrentRate(enterCurrency, resultCurrency)
    const res = this.convertCurrency(rate, count);
    
    if (event.target.name === 'input1' || event.target.name === 'currency1' || event.target.name === 'currency2') {
      this.input2 = res;
    } else if (event.target.name === 'input2' ) {
      this.input1 = res;
    } 
  }


}
