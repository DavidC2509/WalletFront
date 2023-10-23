import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryAccountService } from '../../services/CategoryAccount.service';
import { ClassifierModel } from '../../models/ClassifierModel';

@Component({
  selector: 'app-account-model',
  templateUrl: './account-model.component.html',
})
export class AccountModelComponent {
  form: FormGroup;
  public modules: ClassifierModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService: CategoryAccountService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      salary: [0, [Validators.required]],
      categoryAccountId: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this._categoryService
      .getListCategoryAccount()
      .subscribe((res) => (this.modules = res.body));

    
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        salary: this.data.salary,
        categoryAccountId: this.data.categoryAccount.id,
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
