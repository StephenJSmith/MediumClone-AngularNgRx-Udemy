import { Route } from "@angular/router";
import { EditArticleComponent } from "./components/editArticle/editArticle.component";
import { EditArticleService } from "./services/editArticle.service";
import { provideState } from "@ngrx/store";
import { editArticleFeatureKey, editArticleReducer } from "./store/reducers";
import * as editArticleEffects from './store/effects';
import { provideEffects } from "@ngrx/effects";

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideState(editArticleFeatureKey, editArticleReducer),
      provideEffects(editArticleEffects),
    ],
  },
]