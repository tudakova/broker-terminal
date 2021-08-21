import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  amount: number;
}

@Component({
  selector: 'app-dialog-overview-settings',
  templateUrl: './dialog-overview-settings.component.html',
  styleUrls: ['./dialog-overview-settings.component.scss']
})
export class DialogOverviewSettingsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
