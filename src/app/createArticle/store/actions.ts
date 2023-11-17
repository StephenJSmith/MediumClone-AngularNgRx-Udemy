import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ArticleRequestInterface } from "src/app/shared/components/articleForm/types/articleRequest.interface";
import { ArticleInterface } from "src/app/shared/types/articleInterface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export const createArticleActions = createActionGroup({
  source: 'createArticle',
  events: {
    'Create article': props<{request: ArticleRequestInterface}>(),
    'Create article success': props<{article: ArticleInterface}>(),
    'Create article failure': props<{errors: BackendErrorsInterface}>(),
  }
})