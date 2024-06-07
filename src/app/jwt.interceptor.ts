import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt != null) {
    const nouvelleRequete = req.clone({ setHeaders: { Authorization: jwt } });
    return next(nouvelleRequete);
  }

  throw Error(
    "A l'attention du développeur : Vous utiliser le service HttpClient global, il " +
      "faut donc qu'il y ai un jwt dans le localstorage (Peut être faut il ajouter HttpClientModule " +
      'dans les imports du composant pour ne pas utiliser cet intercepteur)'
  );
};
