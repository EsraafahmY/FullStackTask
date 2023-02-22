import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { employeemodel } from '../Model/employeemodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService) { }
  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  
  employeedata!: employeemodel[];
  finaldata:any;


  ngOnInit(): void {
    this.Loademployees();
  }

  displayColumns: string[]=["id","firstName","lastName","phoneNumber","salary","department","hireData" ,"action"]


  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.Loademployees();
    });
  }

  Loademployees() {
    this.api.Getallemployees().subscribe(response => {
      this.employeedata = response;
      this.finaldata=new MatTableDataSource<employeemodel>(this.employeedata);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  Editemployee(id: any) {
    this.Openpopup(id);
  }
  Removeemployee(id: any) {
    alertify.confirm("Remove employee", "do you want remove this employee?", () => {
      this.api.RemoveEmployee(id).subscribe(r => {
        this.Loademployees();
      });
    }, function () {

    })


  }

}
