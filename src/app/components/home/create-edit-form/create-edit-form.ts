import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EmployeeData } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employeeService/employee-service';

@Component({
  selector: 'app-create-edit-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit-form.html',
  styleUrl: './create-edit-form.scss'
})
export class CreateEditForm implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() isCreate: boolean = true;
  @Input() availableGroups: string[] = [];
  @Input() employeeData!: EmployeeData;
  @Output() close = new EventEmitter<void>();

  errorMessage: string | undefined;
  statusList: string[] = [
    'Active',
    'On Leave',
    'Terminated'
  ];
  today: string;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen'].currentValue && this.isCreate){
      this.resetForm();
    }
    console.log(this.employeeData);
    
  }

  constructor(private employeeService: EmployeeService){
    this.today = new Date().toISOString().split('T')[0];
    this.resetForm();
  }

  private resetForm(): void {
    this.employeeData = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: new Date(),
      basicSalary: 0,
      status: 'Active',
      group: this.availableGroups[0] || '',
      description: new Date(),
    };
  }
  get birthDateValue(): string {
    if (this.employeeData.birthDate) {
      const date = new Date(this.employeeData.birthDate);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date.toISOString().slice(0, 10);
    }
    return '';
  }

  set birthDateValue(value: string) {
    this.employeeData.birthDate = new Date(value);
  }

  getTodayDate(){
    return new Date();  
  }
  
  insertNewEmployee(){
    this.employeeService.insertNewEmployee(this.employeeData).subscribe({
      next: res => {
        if (res.responseCode == 200){
          this.closeForm();
        }
        else if(res.responseCode == 400){
          this.errorMessage = res.message;
        }
      }
    });
  }

  editEmployee(){
    this.employeeService.editEmployee(this.employeeData).subscribe({
      next: res => {
        if (res.responseCode == 200){
          this.closeForm();
        }
        else if(res.responseCode == 400){
          this.errorMessage = res.message;
        }
      }
    })
  }

  saveEmployee(): void {
    this.errorMessage = undefined;
    if(this.isCreate){
      this.insertNewEmployee();
    }
    else{
      this.editEmployee();
    }
  }

  closeForm(): void {
    console.log(this.employeeData);
    
    this.close.emit();
  }
}
