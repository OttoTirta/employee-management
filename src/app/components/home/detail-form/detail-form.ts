import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeData } from '../../../models/employee.model';
import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-detail-form',
  imports: [CommonModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.scss'
})
export class DetailForm {
  @Input() employee!: EmployeeData;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeDetail(): void {
    this.close.emit();
  }
}
