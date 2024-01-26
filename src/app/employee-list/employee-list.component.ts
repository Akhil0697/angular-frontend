import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { NgForOf } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  deleteEmployee(id: number | undefined): void {
    // Check if id is defined before making the API call
    if (id !== undefined) {
      this.employeeService.DeleteEmployee(id).subscribe(
        data => {
          console.log('Employee deleted successfully', data);
          // You can perform additional actions or update your UI here if needed
        },
        error => {
          console.error('Error deleting employee', error);
          // Handle the error or display a message to the user
        }
      );
    } else {
      console.warn('Invalid employee ID');
      // Handle the case where id is undefined, show a warning, or take appropriate action
    }
  }
  DeleteEmployeeComponent(id:number){
    this.employeeService.DeleteEmployee(id).subscribe((data =>{
      console.log("successfully deleted",id)
      this.getEmployees();
    }))
  }
  

  employees: Employee[] | undefined;
  constructor(private employeeService: EmployeeService ,private router:Router) { }
  ngOnInit(): void {
  this.getEmployees();
  }

 getEmployees() {
  this.employeeService.getEmployeesList().subscribe(data =>{
    this.employees = data;
  } )
  }
  updateEmployee(id: number|undefined) {
    console.log('Employee ID:',id);
    if (id !== undefined) {
      this.router.navigate(['update-employee', id]);
    }
  }
  employeeDetails(id: number|undefined) {
    this.router.navigate(['employee-details', id]);

    }
}
