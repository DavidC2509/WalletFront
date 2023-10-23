import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovementService } from '../services/Movement.service';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR, UPDATE_ERROR, UPDATE_SUCCESS, DELETE_ERROR, DELETE_SUCCESS } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { categoryAccountConfigTable } from '../category-acount/category-acount.config';
import { ClassifierModel } from '../models/ClassifierModel';
import { MovementModelComponent } from './movement-model/movement-model.component';
import { MovementModel } from '../models/MovementModel';
import { movementConfigTable } from './movement.config';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
})
export class MovementsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  columns: Array<any> = movementConfigTable;
  data$ = new BehaviorSubject<MovementModel[]>([]);
  subscription: Subscription = new Subscription();

  constructor(
    private movementService: MovementService,
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
      this.movementService.getListMovement().subscribe((res) => {
        this.data$.next(res.body);
      })
    );
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(MovementModelComponent, {
      data: null,
      disableClose: true,
      width: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s),
        exhaustMap((res) => this.movementService.storeMovement(res))
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
    this.movementService
      .getMovement(row.id)
      .pipe(
        exhaustMap((res) => {
          const dialogRef = this.dialog.open(MovementModelComponent, {
            data: res.body,
            disableClose: true,
            width: '800px',
          });
          return dialogRef.afterClosed();
        }),
        filter((s) => s),
        exhaustMap((res) => this.movementService.updateMovement(res))
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
    debugger
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eleminar',
      message: `está seguro de que desea eliminar Movimiento con ID ${row.id} ?`,
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
        exhaustMap((res) => this.movementService.deleteMovement(row.id))
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
