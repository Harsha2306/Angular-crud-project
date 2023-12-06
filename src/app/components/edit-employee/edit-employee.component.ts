import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  employeeService: EmployeeService = inject(EmployeeService);
  employeeForm = this.formBuilder.group({
    id: [0, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: [0, Validators.required],
  });
  currentEmployee: string;
  ngOnInit() {
    this.employeeForm.controls.id.setValue(
      +this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.employeeService
      .getEmployeeForUpdate(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((val) => {
        this.employeeForm.controls.firstName.setValue(val.firstName);
        this.employeeForm.controls.lastName.setValue(val.lastName);
        this.employeeForm.controls.mobileNumber.setValue(val.mobileNumber);
      });
    this.employeeService
      .getEmployee(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (val) => {
          this.currentEmployee = val;
        },
        (err) => console.log(err)
      );
  }
  onUpdate() {
    this.employeeService
      .updateEmployee(
        this.currentEmployee,
        this.employeeForm.controls.id.value,
        this.employeeForm.controls.firstName.value,
        this.employeeForm.controls.lastName.value,
        this.employeeForm.controls.mobileNumber.value
      )
      .subscribe(
        () => {
          alert(`updated successfully`);
          this.router.navigate(['/employees']);
        },
        (err) => console.log(err)
      );
  }
}
