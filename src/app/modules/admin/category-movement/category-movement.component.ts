import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryMovementService } from '../services/Category-movement.service';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR, UPDATE_ERROR, UPDATE_SUCCESS } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { CategoryAcountModelComponent } from '../category-acount/category-acount-model/category-acount-model.component';
import { categoryAccountConfigTable } from '../category-acount/category-acount.config';
import { ClassifierModel } from '../models/ClassifierModel';
import { CategoryMovementModelComponent } from './category-movement-model/category-movement-model.component';

@Component({
  selector: 'app-category-movement',
  templateUrl: './category-movement.component.html',
})
export class CategoryMovementComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  columns: Array<any> = categoryAccountConfigTable;
  data$ = new BehaviorSubject<ClassifierModel[]>([]);
  subscription: Subscription = new Subscription();

  constructor(
    private movementService: CategoryMovementService,
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
      this.movementService.getListCategoryMovement().subscribe((res) => {
        this.data$.next(res.body);
      })
    );
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(CategoryMovementModelComponent, {
      data: null,
      disableClose: true,
      width: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s),
        exhaustMap((res) => this.movementService.storeCategoryMovement(res))
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
    this.movementService
      .getCategoryMovementt(row.id)
      .pipe(
        exhaustMap((res) => {
          const dialogRef = this.dialog.open(CategoryMovementModelComponent, {
            data: res.body,
            disableClose: true,
            width: '800px',
          });
          return dialogRef.afterClosed();
        }),
        filter((s) => s),
        exhaustMap((res) => this.movementService.updateCategoryMovement(res))
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
}
