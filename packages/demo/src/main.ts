import Aurelia from 'aurelia';
import { GridStackConfiguration } from 'aurelia-gridstack';
import { App } from './app';

Aurelia
  .register(GridStackConfiguration)
  .app(App)
  .start();
