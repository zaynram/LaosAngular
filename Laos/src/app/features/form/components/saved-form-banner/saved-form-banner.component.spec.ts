// src/app/features/form/components/saved-form-banner/saved-form-banner.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedFormBannerComponent } from './saved-form-banner.component';
import { ProgressBarService } from '../../../../shared/services/progress-bar.service';
import { BehaviorSubject } from 'rxjs';

describe('SavedFormBannerComponent', () => {
  let component: SavedFormBannerComponent;
  let fixture: ComponentFixture<SavedFormBannerComponent>;
  let progressBarService: jasmine.SpyObj<ProgressBarService>;
  
  beforeEach(async () => {
    const progressSpy = jasmine.createSpyObj('ProgressBarService', ['getProgress']);
    progressSpy.getProgress.and.returnValue(new BehaviorSubject(50));

    await TestBed.configureTestingModule({
      imports: [SavedFormBannerComponent],
      providers: [
        { provide: ProgressBarService, useValue: progressSpy }
      ]
    }).compileComponents();

    progressBarService = TestBed.inject(ProgressBarService) as jasmine.SpyObj<ProgressBarService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedFormBannerComponent);
    component = fixture.componentInstance;
    component.formId = 'testFormId';
    component.lastUpdated = '2023-01-01T00:00:00Z';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct form link', () => {
    const inputElement = fixture.nativeElement.querySelector('input[type="text"]');
    expect(inputElement.value).toContain('testFormId');
  });

  it('should emit reset event on reset button click', () => {
    spyOn(component.formReset, 'emit');
    const resetButton = fixture.nativeElement.querySelector('.reset-button');
    resetButton.click();
    expect(component.formReset.emit).toHaveBeenCalled();
  });

  it('should copy form link to clipboard', () => {
    spyOn(navigator.clipboard, 'writeText');
    component.copyFormLink();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${window.location.origin}${window.location.pathname}?formId=testFormId`);
  });

  it('should get progress from ProgressBarService', () => {
    const progress = component.progress;
    expect(progressBarService.getProgress).toHaveBeenCalled();
    progress.subscribe(value => {
      expect(value).toBe(50);
    });
  });
});