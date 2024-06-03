import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  listeRoles: string[] = ['Etudiant', 'Gestionnaire', 'Administrateur'];

  formBuilder: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    role: ['Etudiant', [Validators.required]],
  });

  http: HttpClient = inject(HttpClient);

  onSubmit() {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://localhost/backend-angular-ticket-dw2-24/add-user.php',
          this.formulaire.value
        )
        .subscribe({
          next: (resultat) => console.log(resultat),
          error: (resultat) =>
            alert('Erreur inconnue contactez votre administrateur'),
        });
    }
  }
}
