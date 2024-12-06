// src/app/features/form/form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormService } from '../../shared/services/form.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProgressBarService } from '../../shared/services/progress-bar.service';
import { ActivatedRoute } from '@angular/router';
import { Question, FormData } from '../../shared/models/form.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  currentQuestion: Question | null = null;
  lastUpdated: Date = new Date();
  formData: FormData = {};
  formId: string | null = null;
  isAnalyzing = false;
  showIntro = true;
  validationErrors: Record<string, string> = {};
  isSubmitting = false;
  currentQuestionIndex = 0;
  questions: Question[] = [];

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private progressBarService: ProgressBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const formId = params['formId'];
      if (formId) {
        this.loadSavedForm(formId);
      }
    });

    this.formService.getQuestions().subscribe(questions => {
      this.questions = questions;
      this.currentQuestion = questions[0];
    });
  }

  async loadSavedForm(formId: string) {
    try {
      const progress = await this.formService.loadProgress(formId);
      if (progress) {
        this.formData = progress.formData;
        this.formId = progress.formId;
        this.lastUpdated = progress.lastUpdated;
        this.currentQuestionIndex = progress.lastAnsweredQuestionIndex;
        this.navigateToQuestion(this.currentQuestionIndex);
      }
    } catch (error) {
      this.notificationService.show('Error loading form: ' + (error as Error).message, 'error');
    }
  }

  handleBegin() {
    this.showIntro = false;
    this.navigateToQuestion(1);
  }

  async handleInputChange(questionId: string, value: string) {
    this.formData[questionId] = value;
    if (this.currentQuestion?.id === 'case-description') {
      this.isAnalyzing = true;
      await this.generateDynamicQuestions();
    }
    await this.formService.saveProgress(this.formData, this.currentQuestionIndex);
  }

  async generateDynamicQuestions() {
    try {
      const caseDescription = this.formData['case-description'] || '';
      const dynamicQuestions = await this.formService.generateDynamicQuestions(caseDescription);
      this.questions = [...this.questions, ...dynamicQuestions];
      this.isAnalyzing = false;
    } catch (error) {
      this.notificationService.show('Error analyzing case: ' + (error as Error).message, 'error');
      this.isAnalyzing = false;
    }
  }

  navigateToQuestion(index: number) {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestion = this.questions[index];
      this.currentQuestionIndex = index;
      this.progressBarService.updateProgress(index, this.questions.length);
    }
  }

  handleNext() {
    const nextIndex = this.currentQuestion?.nextQuestionId ? 
      this.questions.findIndex(q => q.id === this.currentQuestion?.nextQuestionId) :
      this.currentQuestionIndex + 1;
    this.navigateToQuestion(nextIndex);
  }

  handlePrevious() {
    this.navigateToQuestion(this.currentQuestionIndex - 1);
  }

  handleReset() {
    this.formData = {};
    this.formId = null;
    this.lastUpdated = new Date();
    this.currentQuestionIndex = 0;
    this.showIntro = true;
    this.formService.clearProgress();
    this.navigateToQuestion(0);
  }

  async handleSubmit() {
    this.isSubmitting = true;
    try {
      await this.formService.submitForm(this.formData);
      this.notificationService.show('Form submitted successfully!', 'success');
      this.handleReset();
    } catch (error) {
      this.notificationService.show('Error submitting form: ' + (error as Error).message, 'error');
    } finally {
      this.isSubmitting = false;
    }
  }
}