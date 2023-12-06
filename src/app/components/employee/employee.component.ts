import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);
  employeeService: EmployeeService = inject(EmployeeService);
  employeeForm = this.formBuilder.group({
    id: [null, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: [null, Validators.required],
  });
  onSubmit() {
    this.employeeService.addEmployee(
      this.employeeForm.controls.id.value,
      this.employeeForm.controls.firstName.value,
      this.employeeForm.controls.lastName.value,
      this.employeeForm.controls.mobileNumber.value,
      
    );
    alert(`Employee ${this.employeeForm.controls.firstName.value} added`);
    this.router.navigate(["/employees"])
  }
}