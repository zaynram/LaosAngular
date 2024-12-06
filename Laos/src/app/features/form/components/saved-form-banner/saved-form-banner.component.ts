// src/app/features/form/components/saved-form-banner/saved-form-banner.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProgressBarService } from '../../../../shared/services/progress-bar.service';

@Component({
  selector: 'app-saved-form-banner',
  standalone: true,
  templateUrl: './saved-form-banner.component.html',
  styleUrls: ['./saved-form-banner.component.scss']
})
export class SavedFormBannerComponent {
  @Input() formId!: string;
  @Input() lastUpdated!: string;
  @Output() formReset = new EventEmitter<void>();
  isOpen = false;

  constructor(private progressBarService: ProgressBarService) {}

  get progress() {
    return this.progressBarService.getProgress();
  }

  copyFormLink() {
    const url = `${window.location.origin}${window.location.pathname}?formId=${this.formId}`;
    navigator.clipboard.writeText(url);
  }

  onReset() {
    this.formReset.emit();
  }
}