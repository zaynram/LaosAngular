import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../shared/models/form.model';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent {
  @Input() question!: Question;
  @Input() value = '';
  @Input() hasError = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter<void>();

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enter.emit();
    }
  }
}