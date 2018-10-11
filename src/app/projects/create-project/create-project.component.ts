import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  layers: string[] = ['1', '2'];

  projectCreator = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl(''),
    description: new FormControl(''),
    store: new FormControl('', [Validators.required]),
    layers: new FormControl({ value: '', disabled: !this.layers.length }, [
      Validators.required
    ])
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.projectCreator.value);
  }
}
