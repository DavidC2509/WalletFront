import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccountModel } from '../models/AccountModel';
import { accountConfigTable } from './account.config';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

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
    private _fuseConfirmationService: FuseConfirmationService,
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
        this.data$.next(res.body);
      })
    );
  }

  // public onNew(): void {
  //   const dialogRef = this.dialog.open(PlatformModalComponent, {
  //     data: null,
  //     disableClose: true,
  //     width: '800px',
  //   });
  //   dialogRef
  //     .afterClosed()
  //     .pipe(
  //       filter((s) => s),
  //       exhaustMap((res) => this.platformService.createPlatform(res))
  //     )
  //     .subscribe(
  //       () => {
  //         this.toastrService.success(CREATE_SUCCESS);
  //         this.loadData();
  //       },
  //       () => {
  //         this.toastrService.error(CREATE_ERROR);
  //       }
  //     );
  // }

  // public onAction(event: { type: string; row: any }): void {
  //   if (event.type === 'edit') {
  //     this.onEdit(event.row);
  //   }
  //   if (event.type === 'delete') {
  //     this.onDelete(event.row);
  //   }
  // }

  // private onEdit(row: any): void {
  //   this.platformService
  //     .getByIdPlatform(row.id)
  //     .pipe(
  //       exhaustMap((res) => {
  //         const dialogRef = this.dialog.open(PlatformModalComponent, {
  //           data: res.body,
  //           disableClose: true,
  //           width: '800px',
  //         });
  //         return dialogRef.afterClosed();
  //       }),
  //       filter((s) => s),
  //       exhaustMap((res) => this.platformService.updatePlatform(res))
  //     )
  //     .subscribe(
  //       () => {
  //         this.toastrService.success(UPDATE_SUCCESS);
  //         this.loadData();
  //       },
  //       () => {
  //         this.toastrService.error(UPDATE_ERROR);
  //       }
  //     );
  // }

  // private onDelete(row: any): void {
  //   const confirmation = this._fuseConfirmationService.open({
  //     title: 'Delete platform',
  //     message: `está seguro de que desea eliminar Platform con ID ${row.id} ?`,
  //     actions: {
  //       confirm: {
  //         label: 'Delete',
  //       },
  //     },
  //   });

  //   confirmation
  //     .afterClosed()
  //     .pipe(
  //       filter((res) => res === 'confirmed'),
  //       exhaustMap((res) => this.platformService.deletePlatform(row.id))
  //     )
  //     .subscribe(
  //       () => {
  //         this.toastrService.success(DELETE_SUCCESS);
  //         this.loadData();
  //       },
  //       () => {
  //         this.toastrService.error(DELETE_ERROR);
  //       }
  //     );
  // }
}