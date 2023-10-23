import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountModel } from '../../models/AccountModel';
import { AccountService } from '../../services/Account.service';

@Component({
  selector: 'app-transfer-movement-model',
  templateUrl: './transfer-movement-model.component.html',
})
export class TransferMovementModelComponent {
  form: FormGroup;
  public modulesAccount: AccountModel[] = [];
  public modulesOrigin: AccountModel[] = [];
  public boolDisabe: AccountModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TransferMovementModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _accountService: AccountService

  ) {
    this.form = this.formBuilder.group({
      id: [null],
      accountOrigin: ['', [Validators.required]],
      accountDestiny: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      date: [null, [Validators.required]]
      

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

  public select(idOrigin : string): void {
    
    this.modulesOrigin = this.modulesAccount.filter(x => x.id != idOrigin );
  }

}
