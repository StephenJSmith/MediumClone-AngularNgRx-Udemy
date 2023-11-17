import { ArticleInterface } from "src/app/shared/types/articleInterface"

export interface ArticleStateInterface {
  isLoading: boolean
  error: string | null
  data: ArticleInterface | null
}