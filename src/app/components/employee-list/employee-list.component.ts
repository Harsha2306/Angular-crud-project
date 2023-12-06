import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/interface/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  loading: boolean = false;
  employees: Employee[] = [];
  router: Router = inject(Router);
  employeeService: EmployeeService = inject(EmployeeService);
  http: HttpClient = inject(HttpClient);
  getData() {
    this.employeeService.getEmployees().subscribe(
      (val) => {
        this.employees = val;
      },
      (err) => {
        alert(`Error occured while fetching data : ${err.message}`);
      }
    );
  }
  ngOnInit(): void {
    this.loading = true;
    this.getData();
    this.loading = false;
  }
  identify(index, employee) {
    return employee.uniqueId;
  }
  onDelete(uniqueId: number) {
    this.employeeService.getEmployee(uniqueId).subscribe(
      (val) => {
        this.employeeService.deleteEmployee(val).subscribe(
          () => {
            this.getData();
          },
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );
  }
  onEdit(id: number) {
    this.router.navigate(['updateEmployee', id]);
  }
}
