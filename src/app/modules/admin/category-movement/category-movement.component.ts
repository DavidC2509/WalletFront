import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryMovementService } from '../services/Category-movement.service';
import { MatDialog } from '@angular/material/dialog';
import { CREATE_SUCCESS, CREATE_ERROR } from 'app/core/const';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, filter, exhaustMap } from 'rxjs';
import { CategoryAcountModelComponent } from '../category-acount/category-acount-model/category-acount-model.component';
import { categoryAccountConfigTable } from '../category-acount/category-acount.config';
import { ClassifierModel } from '../models/ClassifierModel';

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
    private accountService: CategoryMovementService,
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
      this.accountService.getListCategoryMovement().subscribe((res) => {
        this.data$.next(res.body);
      })
    );
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(CategoryAcountModelComponent, {
      data: null,
      disableClose: true,
      width: '800px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s),
        exhaustMap((res) => this.accountService.storeCategoryMovement(res))
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
