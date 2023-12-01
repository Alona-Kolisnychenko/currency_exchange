import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { currencies } from 'src/app/shared/data/currencies';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public rateToUAH: any = {};
  
  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrency(currencies);
  }

  getCurrency(currency: Array<string>){
    currency.forEach((element) => {
      if (element.toUpperCase() !== 'UAH') {
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
}
