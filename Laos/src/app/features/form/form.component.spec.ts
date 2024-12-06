// src/app/features/form/form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormService } from '../../shared/services/form.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ProgressBarService } from '../../shared/services/progress-bar.service';
import { BehaviorSubject } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { describe } from 'node:test';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formService: jasmine.SpyObj<FormService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let progressBarService: jasmine.SpyObj<ProgressBarService>;

  beforeEach(async () => {
    const formSpy = jasmine.createSpyObj('FormService', [
      'getQuestions', 
      'loadProgress',
      'saveProgress',
      'generateDynamicQuestions',
      'submitForm'
    ]);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['show']);
    const progressSpy = jasmine.createSpyObj('ProgressBarService', ['updateProgress']);

    formSpy.getQuestions.and.returnValue(new BehaviorSubject([]));

    await TestBed.configureTestingModule({
      imports: [provideRouter, provideLocationMocks ],
      declarations: [FormComponent],
      providers: [
        { provide: FormService, useValue: formSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: ProgressBarService, useValue: progressSpy }
      ]
    }).compileComponents();

    formService = TestBed.inject(FormService) as jasmine.SpyObj<FormService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    progressBarService = TestBed.inject(ProgressBarService) as jasmine.SpyObj<ProgressBarService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load questions on init', () => {
    expect(formService.getQuestions).toHaveBeenCalled();
  });

  it('should handle form submission', async () => {
    formService.submitForm.and.returnValue(Promise.resolve());
    await component.handleSubmit();
    expect(formService.submitForm).toHaveBeenCalledWith(component.formData);
    expect(notificationService.show).toHaveBeenCalledWith('Form submitted successfully!', 'success');
  });

  it('should handle submission errors', async () => {
    formService.submitForm.and.returnValue(Promise.reject('Error'));
    await component.handleSubmit();
    expect(notificationService.show).toHaveBeenCalledWith('Error submitting form', 'error');
  });
});