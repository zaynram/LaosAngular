// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NotificationService } from './shared/services/notification.service';
import { ProgressBarService } from './shared/services/progress-bar.service';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let progressBarService: jasmine.SpyObj<ProgressBarService>;

  beforeEach(async () => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['clear', 'getNotification']);
    const progressSpy = jasmine.createSpyObj('ProgressBarService', ['getProgress']);
    
    notificationSpy.getNotification.and.returnValue(new BehaviorSubject(null));
    progressSpy.getProgress.and.returnValue(new BehaviorSubject(0));

    await TestBed.configureTestingModule({
      imports: [provideLocationMocks],
      declarations: [AppComponent],
      providers: [
        { provide: NotificationService, useValue: notificationSpy },
        { provide: ProgressBarService, useValue: progressSpy }
      ]
    }).compileComponents();

    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    progressBarService = TestBed.inject(ProgressBarService) as jasmine.SpyObj<ProgressBarService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('Digital Intake');
  });

  it('should clear notification on close', () => {
    component.onNotificationClose();
    expect(notificationService.clear).toHaveBeenCalled();
  });

  it('should subscribe to notifications', () => {
    expect(notificationService.getNotification).toHaveBeenCalled();
  });

  it('should subscribe to progress updates', () => {
    expect(progressBarService.getProgress).toHaveBeenCalled();
  });
});