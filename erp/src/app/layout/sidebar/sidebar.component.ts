import { Component,Output,EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() headerChange = new EventEmitter<string>();

  setHeader(title: string) {
    this.headerChange.emit(title);
  }
}
