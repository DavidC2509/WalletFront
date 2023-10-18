import { Component } from '@angular/core';
import { configTableMovement, configTableAccount } from './dashboard.config';
import { MovementModel } from '../models/MovementModel';
import { AccountModel } from '../models/AccountModel';
import { AccountService } from '../services/account.service';
import { MovementService } from '../services/Movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  totalTxAmount: 0;


  dataMovement: MovementModel[];
  dataAccounts: AccountModel[]

  columnsMovement: Array<any> = configTableMovement;
  columnsAccount: Array<any> = configTableAccount;
  constructor(private accountService: AccountService, private movementService: MovementService) { }

  ngOnInit(): void {
    this.loadDataAccount();
    this.loadDataMovement();
  }

  private loadDataAccount(): void {
    
    this.accountService
      .getListAccount()
      .subscribe(
        {
          next: (value) => {
            
            this.dataAccounts = value.body;
            this.dataAccounts.forEach(a => this.totalTxAmount += a.salary);

          }
        });

  }

  private loadDataMovement(): void {
    
    this.movementService
      .getListMovement()
      .subscribe(
        {
          next: (value) => {
            
            this.dataMovement = value.body;
          }
        });
  }

}
