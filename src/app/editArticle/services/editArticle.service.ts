import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleRequestInterface } from "src/app/shared/components/articleForm/types/articleRequest.interface";
import { ArticleInterface } from "src/app/shared/types/articleInterface";
import { ArticleResponseInterface } from "src/app/shared/types/articleResponse.interface";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface,
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(
        map(response => response.article)
      )
  }
}