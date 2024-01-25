import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  id: any;

 constructor(private employeeService: EmployeeService,
  private route:ActivatedRoute,private router:Router){}

ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  this.employeeService.getEmployeeById(this.id).subscribe(data =>{
    this.employee = data;
  }, error => console.log(error));
}
onSubmit() {
  console.log(this.employee);
  this.employeeService.updateEmployee(this.id,this.employee).subscribe(data =>{
    console.log('Update successful', data);

    this.goTOEmployeeList();
  },error => console.log(error) );
  }
  goTOEmployeeList(){
    console.log('Navigating to employee list');
    this.router.navigate(['/employees']);
  }
}
