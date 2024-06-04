import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  generateurFormulaire: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formulaire: FormGroup = this.generateurFormulaire.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required]],
  });

  onConnexion() {
    if (this.formulaire.valid) {
      this.http
        .post<any>(
          'http://localhost/backend-angular-ticket-dw2-24/connexion.php',
          this.formulaire.value
        )
        .subscribe((resultat) => {
          localStorage.setItem('jwt', resultat.jwt);
          this.router.navigateByUrl('/home');
        });
    }
  }
}
