import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ArticleFormValuesInterface } from "./articleFormValues.interface";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { BackendErrorMessages } from "../backendErrorMessages/backendErrorMessages.component";

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessages,
  ]
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface
  @Input() isSubmitting = false
  @Input() errors: BackendErrorsInterface | null = null

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()

 form = this.fb.nonNullable.group({
  title: '',
  description: '',
  body: '',
  tagList: '',
 })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
   this.initialiseForm()
  }

  initialiseForm() {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided')
    }

    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    })
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue()
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    }

    this.articleSubmit.emit(articleFormValues)
  }
}