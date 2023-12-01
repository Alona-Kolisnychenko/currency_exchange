import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CustomInputComponent ,
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor{
  public value!: number;
  public isDisabled:boolean = false;
  public onChange!: (value:number)=>void;
  public onTouch!:()=>void;

  constructor(){}

  writeValue(val: number): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setValue(event: Event){
    const el = event.target as HTMLInputElement;
    const value = Number(el.value);
    this.onChange(value);
  }

}


