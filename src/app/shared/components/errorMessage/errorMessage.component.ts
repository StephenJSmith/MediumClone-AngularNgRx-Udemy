import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'mc-error-message',
  templateUrl: './errorMessage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  @Input() message = 'Something went wrong'
}