import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import * as moment from 'moment';
moment.locale('pt-br');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
