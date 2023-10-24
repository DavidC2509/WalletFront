import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TypeMovement } from 'app/core/const';
import { AccountService } from 'app/modules/admin/services/Account.service';
import { Subscription } from 'rxjs';
import { IReportForm } from './report-form.model';

@Component({
  selector: 'report-form',
  templateUrl: './form-filter.component.html',
})
export class FormFilterComponent implements OnInit, OnDestroy {
  @Input() values!: IReportForm;
  @Input() isMovement: boolean = false;
  @Output() search = new EventEmitter<IReportForm>();

  public form!: FormGroup;
  public modulesTypeMovement: TypeMovement[] = [TypeMovement.Income, TypeMovement.Exit];
  public modulesAccount = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private _accountService: AccountService
  ) { }

  public ngOnInit(): void {

    this._accountService
      .getListAccount()
      .subscribe((res) => (this.modulesAccount = res));

    this.form = this.formBuilder.group({
      typeMovement: [null],
      accountId: [null],
      startDate: [null],
      endDate: [null],
    });

    if (this.values) {
      this.form.setValue(this.values);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSearch(): void {
    const values = this.form.value;
    this.search.emit({
      typeMovement: this.getAllValue(values.typeMovement),
      accountId: this.getAllValue(values.accountId),
      startDate: values.startDate,
      endDate: values.endDate,
    });
  }

  private getAllValue(value: any): any | null {
    if (value == -1 || value == 'all') {
      return null;
    } else {
      return value;
    }
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
