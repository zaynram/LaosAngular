// src/app/features/form/components/review-page/review-page.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question, FormData } from '../../../../shared/models/form.model';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent {
  @Input() questions: Question[] = [];
  @Input() formData: FormData = {};
  @Input() isSubmitting = false;
  @Output() submit = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<{questionId: string, value: string}>();

  getAnsweredQuestions(): Question[] {
    return this.questions.filter(q => this.formData[q.id]);
  }

  onSubmit() {
    this.submit.emit();
  }

  onInputChange(questionId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputChange.emit({ questionId, value: input.value });
  }
}