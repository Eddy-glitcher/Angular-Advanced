import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import Swal  from 'sweetalert2';

export const AuthGuard: CanActivateFn=(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log("Pasó por el guard");
  const authService = inject(UserService);
  const router      = inject(Router);

  return authService.validateToken()
    .pipe(
      tap(
        (isAuth: boolean)=>{

          console.log("Autoriado: ", isAuth);

          if (!isAuth) {
            // TODO: UN alert para notificar que no son credenciales válidas?????....
            router.navigateByUrl('/login');

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sesión Cerrada",
              showConfirmButton: false,
              timer: 1500
            });
          };
        }
      )
    );
}
