import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currencies } from 'src/app/shared/data/currencies';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public rateToUAH: any = {};
  public form!: FormGroup;
  public currencies = currencies;
  public currentControl!: string;

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCurrentCurrency(currencies);
    this.formSubscription();
  }
  initForm(): void {
    this.form = this.fb.group({
      countFirst: 0,
      countSecond: 0,
      currencyFirst: 'USD',
      currencySecond: 'UAH',
    });
  }
  getCurrentCurrency(currency: Array<string>): void {
    currency.forEach((element) => {
      if (element.toUpperCase() === 'UAH') {
        this.rateToUAH = { ...this.rateToUAH, [element.toUpperCase()]: 1 };
      } else {
        this.currencyService.get().subscribe((data) => {
          const [currentCurrency] = data.filter(
            (el: any) => el.cc === element.toUpperCase()
          );
          this.rateToUAH = {
            ...this.rateToUAH,
            [currentCurrency.cc]: currentCurrency.rate,
          };
        });
      }
    });
  }
  formSubscription(): void {
    this.formControlSubscription('countFirst');
    this.formControlSubscription('countSecond');
    this.formControlSubscription('currencyFirst');
    this.formControlSubscription('currencySecond');
  }

  formControlSubscription(controlName: string): void {
    this.form.controls[controlName].valueChanges.subscribe((v) => {
      this.currentControl = controlName;
    });
  }

  valueByControl(control: string): string {
    return this.form.get(control)?.value;
  }

  getCurrentRate(enterCurrency: string, resultCurrency: string): number {
    if (enterCurrency === resultCurrency) {
      return 1;
    } else if (resultCurrency === 'UAH') {
      return this.rateToUAH[enterCurrency];
    } else if (enterCurrency === 'UAH') {
      return 1 / this.rateToUAH[resultCurrency];
    } else {
      return this.rateToUAH[enterCurrency] / this.rateToUAH[resultCurrency];
    }
  }

  convertCurrency(rate: number, count: number): number {
    const res = count * rate;
    return res;
  }

  changeCount(): void {
    let count!: number;
    let enterCurrency!: string;
    let resultCurrency!: string;
    const formValue = this.form.value;
    if (
      this.currentControl === 'countFirst' ||
      this.currentControl === 'currencyFirst' ||
      this.currentControl === 'currencySecond'
    ) {
      count = formValue.countFirst;
      enterCurrency = formValue.currencyFirst;
      resultCurrency = formValue.currencySecond;
    } else if (this.currentControl === 'countSecond') {
      enterCurrency = formValue.currencySecond;
      resultCurrency = formValue.currencyFirst;
      count = formValue.countSecond;
    }

    const rate = this.getCurrentRate(enterCurrency, resultCurrency);
    const res = this.convertCurrency(rate, count);

    if (
      this.currentControl  === 'countFirst' ||
      this.currentControl  === 'currencyFirst' ||
      this.currentControl  === 'currencySecond'
    ) {
      this.form.controls['countSecond'].setValue(res);
    } else if (this.currentControl  === 'countSecond') {
      this.form.controls['countFirst'].setValue(res);
    }
  }
}
