import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {

}
