import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovementService } from '../services/Movement.service';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { categoryAccountConfigTable } from '../category-acount/category-acount.config';
import { ClassifierModel } from '../models/ClassifierModel';
import { MovementModelComponent } from './movement-model/movement-model.component';
import { MovementModel } from '../models/MovementModel';
import { movementConfigTable } from './movement.config';

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
    private accountService: MovementService,
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
      this.accountService.getListMovement().subscribe((res) => {
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
        exhaustMap((res) => this.accountService.storeMovement(res))
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