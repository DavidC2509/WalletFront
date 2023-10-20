import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { TYPE_MODE_LIST } from 'app/core/const';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private _sort!: MatSort;

  isLoading: boolean = false;
  displayedColumns: string[] = [];
  @Input() columns: Array<any> = [];
  @Input() data: Array<any> = [];

  @Output() action = new EventEmitter();
  @Output() changePaginator = new EventEmitter();

  @Input() total: number = 10;
  @Input() pageSize: number = 10;
  @Input() showPagination: boolean = true;

  public paginatedData: Array<any> = [];
  public totalSize: number = 0;

  protected readonly TYPE_MODE_LIST = TYPE_MODE_LIST;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.totalSize = this.data.length;
      this.sliceData();
    }
  }

  public ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(
      this.columns.map((x) => x.columnDef)
    );
    if (this.data) {
      this.data = this.data.map((r) => ({ ...r, actions: '' }));
      console.info(this.columns);
      this.totalSize = this.data.length;
    }
  }

  public onAction(type: string, row: any) {
    this.action.emit({ type, row });
  }

  public getStatusLabel(value: string, statusList: any): string {
    let status = statusList.find((s) => s.value === value);
    if (status) {
      return status.label;
    } else {
      return 'Sin Label';
    }
  }

  public getStatusColor(value: string, statusList: any): string {
    if (value) {
      let status = statusList.find((s) => s.value === value);
      if (status) {
        const color = status.color;
        return `bg-${color}-200 text-${color}-800 dark:bg-${color}-600 dark:text-${color}-50`;
      } else {
        return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-50';
      }
    }
    return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-50';
  }

  public sliceData() {
    var last = 10;
    if (this.data.length < 10) {
      last = this.data.length;
    }
    this.paginatedData = this.data.slice(0, last);
  }

  public getStatusColorPayments(value: string, statusList: any): string {
    if (value) {
      let status = statusList.find((s) => s.value === value);
      if (status) {
        return status.color;
      } else {
        return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-50';
      }
    }
    return 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-50';
  }

  public changePage(event): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
    this.changePaginator.emit(event);
  }
}
