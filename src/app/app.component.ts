import { Component, ViewChild } from '@angular/core';
import { IgxIconService, IgxNavigationDrawerComponent } from 'igniteui-angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokeCards';
  
  public navItems = [
    { name: 'add', text: 'Create', route: 'create' },
    { name: 'list', text: 'List', route: '' },
  ];

  constructor(
    private _location: Location,
    private iconService: IgxIconService, 
    private router: Router,
    private translateService: TranslateService) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
   }

  public ngOnInit() {
      this.iconService.registerFamilyAlias('material-symbols', 'material-symbols-outlined');
  }
 
  @ViewChild(IgxNavigationDrawerComponent, { static: true })
  public drawer!: IgxNavigationDrawerComponent;


  public selected = 'Avatar';

  public navigate(item:any) {
      this.selected = item.text;
      this.drawer.close();
  }

  navigateRoute(route:string){
    this.router.navigateByUrl(route)
  }

  navigateBack(){
    this._location.back();
  }

  setlanguage(languageCode:string){
    this.translateService.use(languageCode);
  }
}
