import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR, DELETE_ERROR, DELETE_SUCCESS, UPDATE_ERROR, UPDATE_SUCCESS } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { MovementTransferModel } from '../models/MovementTransferModel';
import { MovementModelComponent } from '../movements/movement-model/movement-model.component';
import { TransferMovementService } from '../services/Transfer-Movement.service';
import { movementTransferConfigTable } from './transferMovement.config';
import { TransferMovementModelComponent } from './transfer-movement-model/transfer-movement-model.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-transfer-movement',
  templateUrl: './transfer-movement.component.html',
})
export class TransferMovementComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  columns: Array<any> = movementTransferConfigTable;
  data$ = new BehaviorSubject<MovementTransferModel[]>([]);
  subscription: Subscription = new Subscription();

  constructor(
    private movementTransferService: TransferMovementService,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private _fuseConfirmationService: FuseConfirmationService,

  ) { }

  public ngOnInit(): void {
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadData(): void {
    this.subscription.add(
      this.movementTransferService.getListMovementTransfer().subscribe((res) => {
        this.data$.next(res.body);
      })
    );
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(TransferMovementModelComponent, {
      data: null,
      disableClose: true,
      width: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s),
        exhaustMap((res) => this.movementTransferService.storeMovementTransfer(res))
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
    if (event.type === 'delete') {
      this.onDelete(event.row);
    }
  }

  private onEdit(row: any): void {
    this.movementTransferService
      .getMovementTransfer(row.id)
      .pipe(
        exhaustMap((res) => {
          const dialogRef = this.dialog.open(TransferMovementModelComponent, {
            data: res.body,
            disableClose: true,
            width: '800px',
          });
          return dialogRef.afterClosed();
        }),
        filter((s) => s),
        exhaustMap((res) => this.movementTransferService.updateMovementTransfer(res))
      )
      .subscribe(
        {
          next: () => {
            this.toastrService.success(UPDATE_SUCCESS);
            this.loadData();
          },
          error: () => {
            this.toastrService.error(UPDATE_ERROR);
          }
        }
      );
  }

  private onDelete(row: any): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eleminar',
      message: `está seguro de que desea eliminar Transferencia de cuenta con ID ${row.id} ?`,
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    confirmation
      .afterClosed()
      .pipe(
        filter((res) => res === 'confirmed'),
        exhaustMap((res) => this.movementTransferService.deleteMovementTransfer(row.id))
      )
      .subscribe(
        {
          next: () => {
            this.toastrService.success(DELETE_SUCCESS);
            this.loadData();
          },
          error: () => {
            this.toastrService.error(DELETE_ERROR);
          }
        }
      );
  }
}
