import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AddToFavoritesService } from "./services/addToFavorites.service";
import { Store } from "@ngrx/store";
import { addToFavoritesActions } from "./store/actions";

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class AddToFavoritesComponent {
  @Input() isFavorited = false
  @Input() articleSlug = ''
  @Input() favoritesCount = 0

  constructor(private store: Store) {}

  onHandleLike(): void {
    this.store.dispatch(addToFavoritesActions.addToFavorites({
      isFavorited: this.isFavorited,
      slug: this.articleSlug,
    }))
    this.favoritesCount = (this.isFavorited)
      ? this.favoritesCount - 1
      : this.favoritesCount + 1

    this.isFavorited = !this.isFavorited
  }
}