import { HttpClient } from '@angular/common/http';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../models/Utilisateur.type';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    //HttpClientModule,
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
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  idUtilisateur?: number;

  ngOnInit() {
    this.route.params.subscribe((parametresUrl) => {
      //si il y a bien un parametre dans l'url et que c'est un nombre
      if (parametresUrl['id'] && !isNaN(parametresUrl['id'])) {
        //on créait un nouveau FormGroup dont le formsControl "password" n'a pas de validateur
        this.formulaire = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', []],
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          role: ['Etudiant', [Validators.required]],
        });

        this.http
          .get<Utilisateur>(
            'http://localhost/backend-angular-ticket-dw2-24/get-user.php?id=' +
              parametresUrl['id']
          )
          .subscribe({
            next: (user: Utilisateur) => {
              this.formulaire.patchValue(user);
              this.idUtilisateur = user.id;
            },
            error: () =>
              alert('Erreur inconnue contactez votre administrateur'),
          });
      } else {
        this.formulaire = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          firstname: ['', [Validators.required]],
          lastname: ['', [Validators.required]],
          role: ['Etudiant', [Validators.required]],
        });
      }
    });
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const url: string =
        this.idUtilisateur == null
          ? 'http://localhost/backend-angular-ticket-dw2-24/add-user.php'
          : 'http://localhost/backend-angular-ticket-dw2-24/edit-user.php?id=' +
            this.idUtilisateur;

      this.http.post(url, this.formulaire.value).subscribe({
        next: (resultat) => {
          this.snackBar.open("L'utilisateur a bien été ajouté", undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'valid',
          });

          this.router.navigateByUrl('/manage-user');
        },
        error: (resultat) =>
          alert('Erreur inconnue contactez votre administrateur'),
      });
    }
  }
}
