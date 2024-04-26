import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../componentes/shared/snack-bar/snack-bar.component";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router, private _snackBar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.loginService.estaLogueado()) {
            return true;
        }
        else {
            this.router.navigate(['/']);

            this._snackBar.openFromComponent(SnackBarComponent, {
                data: { mensaje: 'No tiene permisos para acceder a esta sección.' },
                duration: 5000,
            });

            return false;
        }
    }
}