import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassifierModel } from 'app/core/models/ClassifierModel';
import { CategoryAccountService } from '../services/CategoryAccount.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription, exhaustMap, filter } from 'rxjs';
import { categoryAccountConfigTable } from './category-acount.config';
import { CREATE_SUCCESS, CREATE_ERROR, UPDATE_ERROR, UPDATE_SUCCESS, DELETE_ERROR, DELETE_SUCCESS } from 'app/core/const';
import { CategoryAcountModelComponent } from './category-acount-model/category-acount-model.component';

@Component({
  selector: 'app-category-acount',
  templateUrl: './category-acount.component.html',
})
export class CategoryAcountComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  columns: Array<any> = categoryAccountConfigTable;
  data$ = new BehaviorSubject<ClassifierModel[]>([]);
  subscription: Subscription = new Subscription();

  constructor(
    private accountService: CategoryAccountService,
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
      this.accountService.getListCategoryAccount().subscribe((res) => {
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
        exhaustMap((res) => this.accountService.storeCategoryAccount(res))
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
      .getCategoryAccount(row.id)
      .pipe(
        exhaustMap((res) => {
          const dialogRef = this.dialog.open(CategoryAcountModelComponent, {
            data: res.body,
            disableClose: true,
            width: '800px',
          });
          return dialogRef.afterClosed();
        }),
        filter((s) => s),
        exhaustMap((res) => this.accountService.updateCategoryAccount(res))
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
