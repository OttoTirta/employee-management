export interface EmployeeData {
  username: string;
  firstName:string;
  lastName:string;
  email:string;
  birthDate: Date;
  basicSalary: number;
  status:string;
  group:string;
  description: Date;
}

export interface EmployeeListFilter {
  pageIndex: number;
  pageSize: number;
  employeeName: string | undefined;
  group: string | undefined;
  sortColumn: string;
  isSortByDesc: boolean;
}

export interface EmployeePaginatedData {
  employeeData: EmployeeData[];
  pageIndex: number;
  pageSize: number;
  totalPage: number;
  totalData: number;
};