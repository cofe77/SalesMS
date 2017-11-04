import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot
}                           from '@angular/router';

@Injectable()
export class AuthService implements CanActivate, CanActivateChild {
  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return this.checkCookie(state.url)&&this.checkApt();
  }

  checkApt(){
    if($.cookie('apt')==undefined||$.cookie('apt')=='null'){
      this.router.navigate(['./']);
      return false;
    }else{
      if($.cookie('apt')=="892"){
        return true;
      }else{
        this.router.navigate(['./']);
        return false;
      }
    }
  }

  checkCookie(_url){
    if($.cookie('operatorInfo')==undefined||$.cookie('operatorInfo')=='null'){
      this.router.navigate(['./']);
      return false;
    }else{
      if(_url.indexOf('admin')>0&&JSON.parse($.cookie('operatorInfo'))['permission']==1){
        return true;
      }else if(_url.indexOf('home')>0&&JSON.parse($.cookie('operatorInfo'))['permission']==2){
        return true;
      }else{
        this.router.navigate(['./']);
        return false;
      }
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    return this.checkCookie(state.url)&&this.checkApt();
  }

  /* . . . */
}
