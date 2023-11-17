import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessages/backendErrorMessages.component";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { authActions } from "../../store/actions";

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BackendErrorMessages,
    RouterLink,
    ReactiveFormsModule,
],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }

    this.store.dispatch(authActions.login({request}))
  }
}