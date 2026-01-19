import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employeeService/employee-service';
import { EmployeeData, EmployeeListFilter } from '../../models/employee.model';
import { FormControl, ReactiveFormsModule} from "@angular/forms";
import { debounceTime } from 'rxjs';
import { CreateEditForm } from "./create-edit-form/create-edit-form";
import { DetailForm } from "./detail-form/detail-form";
import { ConfirmationComponent } from '../shared/confirmation/confirmation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CreateEditForm, DetailForm, ConfirmationComponent, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  employees: EmployeeData[] = [];
  groupList: any[] = [];
  pageSizeList: number[] = [25, 50, 100];
  tableHeaderList: any[] =[
    {
      value: 'Employee',
      isSortable: true,
      sortColumn: 'fullName'
    },
    {
      value: 'Group',
      isSortable: true,
      sortColumn: 'group'
    },
    {
      value: 'Salary',
      isSortable: true,
      sortColumn: 'basicSalary'
    },
    {
      value: 'Status',
      isSortable: true,
      sortColumn: 'status'
    },
    {
      value: 'Actions',
      isSortable: false,
      isAction: true
    },
  ];

  sortingColumn: string = 'Employee';
  isSortByDesc: boolean = false;

  pageSizeForm: FormControl = new FormControl(25);
  groupForm: FormControl = new FormControl('');
  nameForm: FormControl = new FormControl();

  pageIndex: number = 1;
  totalPages: number = 0;
  totalData: number = 0;

  pageLinks: number[] = [1, 2, 4];

  isOpenEmployeeForm: boolean = false;
  isCreateForm: boolean = true;
  isOpenDetail: boolean = false;
  selectedEmployee!: EmployeeData;

  // Confirmation State
  isDeleteConfirmationOpen: boolean = false;
  employeeToDelete: string | null = null;

  constructor(private employeeService: EmployeeService){
    this.activateFilterListener();
    this.fetchData();
  }

  activateFilterListener(){
    this.pageSizeForm.valueChanges.subscribe(x => {
      this.getEmployee();
    });
    this.groupForm.valueChanges.subscribe(x => {
      this.getEmployee();
    });
    this.nameForm.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(x => {
      this.getEmployee();
    });
  }

  fetchData(){
    this.getEmployee();
    this.getGroupList();
  }

  getPageSize(): number{
    return this.pageSizeForm.value;
  }

  getGroupList(){
    this.employeeService.getGroupList().subscribe({
      next: res => {
        this.groupList = res;
      }
    });
  }

  getEmployee(){
    var filterData: EmployeeListFilter = {
      employeeName: this.nameForm.value,
      group: this.groupForm.value,
      pageIndex: this.pageIndex,
      pageSize: this.pageSizeForm.value,
      sortColumn: this.sortingColumn,
      isSortByDesc: this.isSortByDesc
    };
    this.employeeService.getEmployeeList(filterData).subscribe({
      next: res => {
        this.employees = res.employeeData;
        this.totalPages = res.totalPage;
        this.totalData = res.totalData;
      }
    });
  }

  sortTable(columnName: string, isSortable: boolean){
    if(isSortable){
      this.isSortByDesc = !this.isSortByDesc;
      this.sortingColumn = columnName;
      this.getEmployee();
    }
  }

  changePage(page: number){
    this.pageIndex = page;
    this.getEmployee();
  }

  openEmployeeForm(actionType: string){
    this.isOpenEmployeeForm = true;
    this.isCreateForm = actionType == 'Add';
  }
  closeEmployeeForm(){
    this.isOpenEmployeeForm = false;
    this.getEmployee();
  }
  
  openDetailForm(employee: EmployeeData){
    this.selectedEmployee = employee;
    this.isOpenDetail = true;
  }
  closeDetailForm(){
    this.isOpenDetail = false;
  }

  editEmployee(employee: EmployeeData): void {
    this.selectedEmployee = employee;
    this.openEmployeeForm('Edit');
  }

  // Opens the confirmation modal
  deleteEmployee(username: string): void {
    this.employeeToDelete = username;
    this.isDeleteConfirmationOpen = true;
  }

  // Actual deletion logic called after confirmation
  confirmDelete(): void {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployeeByUsername(this.employeeToDelete)
      .subscribe({
        next: res => {
          if (res.responseCode == 200){
            this.getEmployee();
          }
          this.closeDeleteConfirmation();
        },
        error: () => {
          this.closeDeleteConfirmation();
        }
      });
    }
  }

  closeDeleteConfirmation(): void {
    this.isDeleteConfirmationOpen = false;
    this.employeeToDelete = null;
  }
}
