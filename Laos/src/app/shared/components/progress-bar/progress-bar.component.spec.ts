// src/app/shared/components/progress-bar/progress-bar.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressBarService } from '../../services/progress-bar.service';
import { BehaviorSubject } from 'rxjs';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let progressBarService: jasmine.SpyObj<ProgressBarService>;

  beforeEach(async () => {
    const progressSpy = jasmine.createSpyObj('ProgressBarService', ['getProgress']);
    progressSpy.getProgress.and.returnValue(new BehaviorSubject(75));

    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      providers: [
        { provide: ProgressBarService, useValue: progressSpy }
      ]
    }).compileComponents();

    progressBarService = TestBed.inject(ProgressBarService) as jasmine.SpyObj<ProgressBarService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct progress', () => {
    const progressFill = fixture.nativeElement.querySelector('.progress-fill');
    expect(progressBarService.getProgress).toHaveBeenCalled();
    expect(progressFill.style.width).toBe('75%');
  });

  it('should apply the correct styles', () => {
    component.height = 10;
    component.backgroundColor = '#ccc';
    component.progressColor = '#00f';
    fixture.detectChanges();

    const progressBar = fixture.nativeElement.querySelector('.progress-bar');
    const progressFill = fixture.nativeElement.querySelector('.progress-fill');

    expect(progressBar.style.height).toBe('10px');
    expect(progressBar.style.backgroundColor).toBe('rgb(204, 204, 204)');
    expect(progressFill.style.backgroundColor).toBe('rgb(0, 0, 255)');
  });
});