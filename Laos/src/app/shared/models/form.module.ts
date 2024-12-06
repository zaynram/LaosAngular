// src/app/features/form/form.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { QuestionInputComponent } from './components/question-input/question-input.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { RadioOptionsComponent } from './components/radio-options/radio-options.component';
import { SavedFormBannerComponent } from './components/saved-form-banner/saved-form-banner.component';

@NgModule({
  declarations: [
    FormComponent,
    QuestionInputComponent,
    ReviewPageComponent,
    RadioOptionsComponent,
    SavedFormBannerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FormComponent]
})
export class FormModule { }