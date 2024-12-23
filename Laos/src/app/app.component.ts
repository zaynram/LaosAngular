// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { ProgressBarService } from './shared/services/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Digital Intake';
  notification$ = this.notificationService.getNotification();
  progress$ = this.progressBarService.getProgress();

  constructor(
    private notificationService: NotificationService,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit() {
    this.notificationService.init();
    this.progressBarService.init();
    console.log('AppComponent initialized');
  }
  onNotificationClose() {
    this.notificationService.clear();
  }
}