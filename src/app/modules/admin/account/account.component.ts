import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, exhaustMap, filter } from 'rxjs';
import { AccountModel } from '../models/AccountModel';
import { accountConfigTable } from './account.config';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AccountService } from '../services/Account.service';
import { ToastrService } from 'ngx-toastr';
import { AccountModelComponent } from './account-model/account-model.component';
import { CREATE_ERROR, CREATE_SUCCESS, UPDATE_ERROR, UPDATE_SUCCESS } from 'app/core/const';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  columns: Array<any> = accountConfigTable;
  data$ = new BehaviorSubject<AccountModel[]>([]);
  subscription: Subscription = new Subscription();

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadData(): void {
    this.subscription.add(
      this.accountService.getListAccount().subscribe((res) => {
        res.forEach(a => a.nameCategory = a.categoryAccount.name);
        this.data$.next(res);
      })
    );
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(AccountModelComponent, {
      data: null,
      disableClose: true,
      width: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s),
        exhaustMap((res) => this.accountService.storeAccount(res))
      )
      .subscribe(
        {
          next: () => {
            this.toastrService.success(CREATE_SUCCESS);
            this.loadData();
          },
          error: () => {
            this.toastrService.error(CREATE_ERROR);
          }
        }
      );
  }

  public onAction(event: { type: string; row: any }): void {
    if (event.type === 'edit') {
      this.onEdit(event.row);
    }
  }

  private onEdit(row: any): void {
    this.accountService
      .getAccount(row.id)
      .pipe(
        exhaustMap((res) => {
          const dialogRef = this.dialog.open(AccountModelComponent, {
            data: res,
            disableClose: true,
            width: '800px',
          });
          return dialogRef.afterClosed();
        }),
        filter((s) => s),
        exhaustMap((res) => this.accountService.updateAccount(res))
      )
      .subscribe(
        () => {
          this.toastrService.success(UPDATE_SUCCESS);
          this.loadData();
        },
        () => {
          this.toastrService.error(UPDATE_ERROR);
        }
      );
  }

}