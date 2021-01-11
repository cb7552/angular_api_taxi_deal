import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SeoService } from '../services';
@Injectable()
export class SeoGuard implements CanActivate {
    public constructor(private seo: SeoService) { }
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.seo
            .setTitle(route.data['title'])
            .setDescription(route.data['desc']);
        return true;
    }
}
