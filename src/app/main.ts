import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

// To increase the performance speed to load the app
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
