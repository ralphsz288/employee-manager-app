import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-request-absence',
  templateUrl: './request-absence.component.html',
  styleUrl: './request-absence.component.css'
})
export class RequestAbsenceComponent {
  dateRangePicker: MatDateRangePicker<Date>;
  minDate: Date = new Date();

  startDate: Date;
  endDate: Date;
  leaveType: string;

  constructor() {
    this.minDate.setHours(0, 0, 0, 0);
  }

  onSubmit(form: NgForm){
    if(!this.endDate) {
      this.endDate = this.startDate;
    }
    console.log(form.invalid);
  }

}
