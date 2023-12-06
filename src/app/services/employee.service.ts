import { EventEmitter, Injectable, inject } from '@angular/core';
import { Employee } from '../interface/employee';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { link } from 'Links';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http: HttpClient = inject(HttpClient);
  employees: Employee[] = [];
  eventEmitter: EventEmitter<Employee> = new EventEmitter();
  constructor() {}
  addEmployee(
    id: number,
    firstName: string,
    lastName: string,
    mobileNumber: number
  ): void {
    this.http
      .post(`https://${link}/employees.json`, {
        id,
        firstName,
        lastName,
        mobileNumber,
      })
      .subscribe((val) => console.log(val));
  }
  getEmployees() {
    return this.http
      .get<{ [key: string]: Employee }>(`https://${link}/employees.json`)
      .pipe(
        map((res) => {
          const employees = [];
          for (const key in res) employees.push(res[key]);
          return employees;
        })
      );
  }
  deleteEmployee(uniqueId: string) {
    return this.http.delete(`https://${link}/employees/${uniqueId}.json`);
  }
  getEmployee(id: number) {
    return this.http
      .get<{ [key: string]: Employee }>(`https://${link}/employees.json`)
      .pipe(
        map((res) => {
          for (const key in res) if (res[key].id === id) return key;
          return null;
        })
      );
  }
  getEmployeeForUpdate(id: number) {
    return this.http
      .get<{ [key: string]: Employee }>(`https://${link}/employees.json`)
      .pipe(
        map((res) => {
          for (const key in res)
            if (res[key].id === id) {
              console.log(key);
              return res[key];
            }
          return null;
        })
      );
  }
  updateEmployee(
    uniqueId: string,
    id: number,
    firstName: string,
    lastName: string,
    mobileNumber: number
  ) {
    return this.http.put(`https://${link}/employees/${uniqueId}.json`, {
      id,
      firstName,
      lastName,
      mobileNumber,
    });
  }
}
