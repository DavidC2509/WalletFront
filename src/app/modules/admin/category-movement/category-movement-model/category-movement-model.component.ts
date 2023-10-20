import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-movement-model',
  templateUrl: './category-movement-model.component.html',
})
export class CategoryMovementModelComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryMovementModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
      });
    }

  }

  public onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
