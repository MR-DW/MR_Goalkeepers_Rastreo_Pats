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

        console.log("route: ", route )
        console.log("this.loginService.getClubUsuario();: ", this.loginService.getClubUsuario() )

        const clubParam: string = route.params['club'];
        const clubActual: any = this.loginService.getClubUsuario();

        if (clubParam === clubActual) {
            return true;
        } else {
            console.log("Usuario cambió de club:", clubActual);
            this.router.navigate([`/${clubActual}`]);
            this._snackBar.openFromComponent(SnackBarComponent, {
                data: { mensaje: 'ruta incorrecta' },
                duration: 5000,
            });
            return false;
        }
    }
}