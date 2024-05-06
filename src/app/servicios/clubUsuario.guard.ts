import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SnackBarComponent } from "../componentes/shared/snack-bar/snack-bar.component";
import { LoginService } from "./login.service";

@Injectable()
export class ClubUsuarioGuard implements CanActivate {

    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

        const clubParam: string = route.params['club'];
        const clubActual: any = this.loginService.getClubUsuario();

        if (clubParam === clubActual) {
            return true;
        } else {
            this.router.navigate([`/${clubActual}`]);
            this._snackBar.openFromComponent(SnackBarComponent, {
                data: { mensaje: 'Ruta incorrecta' },
                duration: 5000,
            });
            return false;
        }
    }
}