import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface propertiesData {
  key: string;
  value: string | number
}
@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  displayedColumns: string[] = ['key', 'value'];
  dataSource: propertiesData[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: { [key: string]: number | string }) { }

  ngOnInit(): void {
    this.dataSource = Object.entries(this.data || {}).map(([key, value]) => ({ key, value }))
  }

}
