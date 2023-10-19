// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-account-model',
//   templateUrl: './account-model.component.html',
// })
// export class AccountModelComponent {
//   form: FormGroup;

//   constructor(
//     private formBuilder: FormBuilder,
//     public dialogRef: MatDialogRef<PlatformModalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.form = this.formBuilder.group({
//       id: [''],
//       name: ['', [Validators.required]],
//       description: ['', [Validators.required]],
//       active: [false, [Validators.required]],
//     });
//   }

//   public ngOnInit(): void {
//     if (this.data) {
//       this.form.setValue({
//         id: this.data.id,
//         name: this.data.name,
//         description: this.data.description,
//         active: this.data.active,
//       });
//     }
//   }

//   public onSave(): void {
//     this.dialogRef.close(this.form.value);
//   }

//   public onCancel(): void {
//     this.dialogRef.close();
//   }
// }
