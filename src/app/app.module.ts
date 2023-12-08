import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonDirective, IgxButtonModule, IgxCardModule, IgxGridModule, IgxIconModule, IgxInputGroupModule, IgxNavbarModule, IgxNavigationDrawerModule, IgxRippleModule, IgxSnackbarModule } from 'igniteui-angular';
import { ListComponent } from './set/list/list.component';
import { FormComponent } from './set/form/form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './set/detail/detail.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json')
}

function IgxImports(){
  return [
    IgxGridModule,
    IgxCardModule,
    IgxButtonModule,
	  IgxIconModule,
	  IgxRippleModule,
    IgxButtonDirective,
    IgxInputGroupModule, 
    IgxSnackbarModule,
    IgxNavbarModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxNavigationDrawerModule
  ]
}

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    ...IgxImports()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
