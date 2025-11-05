import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

type UserType = 'doador' | 'ong' | null;

@Component({
  selector: 'app-user-type-selector',
  imports: [CommonModule],
  templateUrl: './user-type-selector.html',
  styleUrl: './user-type-selector.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserTypeSelector),
      multi: true
    }
  ]
})
export class UserTypeSelector implements ControlValueAccessor {
  @Input() label: string = "Tipo de conta";
  
  selectedType: UserType = null;
  
  private onChange: (value: UserType) => void = () => {};
  private onTouched: () => void = () => {};

  selectType(type: UserType) {
    this.selectedType = type;
    this.onChange(type);
    this.onTouched();
  }

  writeValue(value: UserType): void {
    this.selectedType = value;
  }

  registerOnChange(fn: (value: UserType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
