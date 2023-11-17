import { ArticleInterface } from "src/app/shared/types/articleInterface"

export interface GetFeedResponseInterface {
  articles: ArticleInterface[]
  articlesCount: number
}