import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthServerProvider } from './AuthServerProvider.Service';
import { ErrorInterceptor } from './ErrorInterceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthServerProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule { }
