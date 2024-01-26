import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { subscribe } from 'diagnostics_channel';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

 employee:Employee | undefined;
  id!: number;

constructor(private route: ActivatedRoute, private employeService: EmployeeService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
    this.employeService.getEmployeeById(this.id).subscribe((data =>{
this.employee = data;
console.log("Data Received...",data);
    }))
  }

}
