// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app';
import { UserListComponent } from './components/user-list/user-list';
import { HttpInterceptorService } from './interceptors/http-interceptor-interceptor';
import { CapitalizeNamePipe } from './pipes/capitalize-name-pipe';
import { FilterByCityPipe } from './pipes/filter-by-city-pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CapitalizeNamePipe,
    FilterByCityPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
