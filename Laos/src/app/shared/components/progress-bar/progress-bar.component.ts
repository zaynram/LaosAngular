// src/app/features/shared/components/progress-bar/progress-bar.component.ts
import { Component, Input } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() height: number = 8;
  @Input() backgroundColor: string = '#ddd';
  @Input() progressColor: string = 'var(--primary-accent)';

  constructor(private progressBarService: ProgressBarService) {}

  get progress() {
    return this.progressBarService.getProgress();
  }
}