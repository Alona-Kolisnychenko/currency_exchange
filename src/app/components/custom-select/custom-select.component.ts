import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { currencies } from 'src/app/shared/data/currencies';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  public value: string = 'USD';
  public isDisabled: boolean = false;
  public onChange!: (value: string) => void;
  public onTouch!: () => void;
  public currencies = currencies;
  public closed: boolean = true;

  constructor() {}

  writeValue(val: string): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setValue(value: string) {
    this.value = value;
    this.closed = true;
    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouch) {
      this.onTouch();
    }
  }
}
