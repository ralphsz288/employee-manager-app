import { Component } from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-request-absence',
  templateUrl: './request-absence.component.html',
  styleUrl: './request-absence.component.css'
})
export class RequestAbsenceComponent {
  dateRangePicker: MatDateRangePicker<Date>;

}
