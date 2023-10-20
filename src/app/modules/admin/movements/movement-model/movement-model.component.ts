import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountModelComponent } from '../../account/account-model/account-model.component';
import { ClassifierModel } from '../../models/ClassifierModel';
import { MovementService } from '../../services/Movement.service';
import { CategoryMovementService } from '../../services/Category-movement.service';
import { TypeMovement } from 'app/core/const';
import { AccountModel } from '../../models/AccountModel';
import { AccountService } from '../../services/Account.service';

@Component({
  selector: 'app-movement-model',
  templateUrl: './movement-model.component.html',
})
export class MovementModelComponent {
  form: FormGroup;
  public modulesCategoryMovement: ClassifierModel[] = [];
  public modulesTypeMovement: TypeMovement[] = [TypeMovement.Income, TypeMovement.Exit];
  public modulesAccount: AccountModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccountModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryMovementService: CategoryMovementService,
    private _accountService: AccountService

  ) {
    this.form = this.formBuilder.group({
      id: [null],
      accountId: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      date: [null, [Validators.required]],
      categoryMovementId: ['', [Validators.required]],
      typeMovement: ['', [Validators.required]],

    });
  }

  public ngOnInit(): void {
    if (this.data) {
      this.form.setValue({
        id: this.data.id,
        name: this.data.name,
        description: this.data.description,
        active: this.data.active,
      });
    }
    this._categoryMovementService
      .getListCategoryMovement()
      .subscribe((res) => (this.modulesCategoryMovement = res.body));

    this._accountService
      .getListAccount()
      .subscribe((res) => (this.modulesAccount = res.body));
  }

  public onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  getTypeMovement(type: TypeMovement) {
    switch (type) {
      case TypeMovement.Income:
        return "Entrada";
      case TypeMovement.Exit:
        return "Salidad";
      default:
        throw new Error("Unsupported type");
    }
  }
}
