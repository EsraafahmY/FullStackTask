import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetEmployeeById(this.data.id).subscribe(response => {
        this.editdata = response;
        this.employeeform.setValue({
          id: this.editdata.id,
          firstName: this.editdata.firstName,
           lastName: this.editdata.lastName,
          phoneNumber: this.editdata.phoneNumber,
           salary: this.editdata.salary, 
           department: this.editdata.department,
           hireDate: this.editdata.hireData
        });
      });
    }
  }

  employeeform = this.builder.group({
    id: this.builder.control('', Validators.required),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('', Validators.required),
    salary: this.builder.control('', Validators.required),
    hireDate: this.builder.control('', Validators.required),
    department: this.builder.control('', Validators.required),
  });

  SaveEmployee() {
    if (this.employeeform.valid) {
      const Editid = this.employeeform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateEmployee(Editid, this.employeeform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Updated successfully.")
        });
      } else {
        this.api.CreateEmployee(this.employeeform.value).subscribe(response => {
          this.closepopup();
          alertify.success("saved successfully.")
        });
      }
   }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}
