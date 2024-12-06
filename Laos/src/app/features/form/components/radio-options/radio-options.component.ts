// src/app/features/form/components/radio-options/radio-options.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../shared/models/form.model';

@Component({
  selector: 'app-radio-options',
  templateUrl: './radio-options.component.html',
  styleUrls: ['./radio-options.component.scss']
})
export class RadioOptionsComponent {
  @Input() question!: Question;
  @Input() savedValue: string | null = '';
  @Input() hasError: boolean | null = false;
  @Output() optionSelect = new EventEmitter<{questionId: string, value: string}>();

  onSelect(value: string) {
    this.optionSelect.emit({questionId: this.question.id, value});
  }
}