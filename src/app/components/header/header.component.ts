import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public USD!: number;
  public EUR!: number;

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
      this.USD = usd.rate;
    });
  }
  getEUR() {
    this.currencyService.get().subscribe((data) => {
      const [eur] = data.filter((el: any) => el.cc === 'EUR');
      this.EUR = eur.rate;
    });
  }
}
