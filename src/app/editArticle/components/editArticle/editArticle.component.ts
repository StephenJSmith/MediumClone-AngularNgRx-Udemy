import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ArticleFormComponent } from "src/app/shared/components/articleForm/articleForm.component";
import { ArticleFormValuesInterface } from "src/app/shared/components/articleForm/articleFormValues.interface";
import { ArticleRequestInterface } from "src/app/shared/components/articleForm/types/articleRequest.interface";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { editArticleActions } from "../../store/actions";
import { ActivatedRoute } from "@angular/router";
import { Observable, combineLatest, filter, map } from "rxjs";
import { selectArticle, selectIsLoading, selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { ArticleInterface } from "src/app/shared/types/articleInterface";

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ArticleFormComponent,
    LoadingComponent,
  ]
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }
    })
  )
  slug = this.route.snapshot.paramMap.get('slug') ?? ''

  data$ = combineLatest({
    initialValues: this.initialValues$,
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    }

    this.store.dispatch(editArticleActions.updateArticle({request, slug: this.slug}))
  }
}