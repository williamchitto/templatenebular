import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirm',
  templateUrl: './dialog-confirm.html',
  styleUrls: ['./dialog-confirm.scss']
})
export class DialogConfirmComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;

  constructor(protected ref: NbDialogRef<DialogConfirmComponent>) {}

  submit(confirmed) {
    this.ref.close(confirmed);
  }

  ngOnInit(): void {}
}
