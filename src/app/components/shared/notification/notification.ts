import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styles: []
})
export class NotificationComponent{
  @Input() message: string = 'Success!';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

}
