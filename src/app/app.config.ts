import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { customInterceptor } from "./service/custom.interceptor";
import { routes } from "./app-routing.module";  // use 'routes' instead of 'Routes'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),  // Use 'routes' directly here
        provideHttpClient(withInterceptors([customInterceptor]))
    ]
}