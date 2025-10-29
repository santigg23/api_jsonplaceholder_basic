import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { CapitalizeNamePipe } from './pipes/capitalize-name.pipe';
import { FilterByCityPipe } from './pipes/filter-by-city.pipe';
import { UserList } from './components/user-list/user-list';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CapitalizeNamePipe,
    FilterByCityPipe,
    UserList
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
