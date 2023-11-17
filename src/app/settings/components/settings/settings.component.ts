import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Subscription, combineLatest, filter } from "rxjs";
import { selectCurrentUser } from "src/app/auth/store/reducers";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { BackendErrorMessages } from "src/app/shared/components/backendErrorMessages/backendErrorMessages.component";
import { authActions } from "src/app/auth/store/actions";
import { CurrentUserRequestInterface } from "src/app/shared/types/currentUserRequest.interface";

@Component({
  selector: 'mc-selector',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessages,

  ]
})
export class SettingsComponent implements OnInit, OnDestroy {
  form = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  })
  currentUser?: CurrentUserInterface
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  currentUserSubscription?: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.store.pipe(
      select(selectCurrentUser),
      filter(Boolean)
    ).subscribe(currentUser => {
      this.currentUser = currentUser
      this.initialiseForm()
    })
  }

  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe()
  }

  onSubmit(): void {
    if (!this.currentUser) { 
      throw new Error('current user not set')
    }

    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      }
    }

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
  }

  onLogout(): void {
    this.store.dispatch(authActions.logout())
  }

  initialiseForm() {
    if (!this.currentUser) { 
      throw new Error('current user not set')
    }

    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username,
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email,
      password: '',
    })
  }
}