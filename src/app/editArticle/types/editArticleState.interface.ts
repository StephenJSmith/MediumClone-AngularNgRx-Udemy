import { ArticleInterface } from "src/app/shared/types/articleInterface"
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface"

export  interface EditArticleStateInterface {
  article: ArticleInterface | null
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}