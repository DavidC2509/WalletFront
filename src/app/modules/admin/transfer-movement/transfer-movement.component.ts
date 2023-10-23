import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { MovementTransferModel } from '../models/MovementTransferModel';
import { MovementModelComponent } from '../movements/movement-model/movement-model.component';
import { TransferMovementService } from '../services/Transfer-Movement.service';
import { movementTransferConfigTable } from './transferMovement.config';
import { TransferMovementModelComponent } from './transfer-movement-model/transfer-movement-model.component';

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
    private accountService: TransferMovementService,
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
      this.accountService.getListMovementTransfer().subscribe((res) => {
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
        exhaustMap((res) => this.accountService.storeMovementTransfer(res))
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
}
