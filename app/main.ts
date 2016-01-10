import 'reflect-metadata';
import 'es6-shim';
import 'semantic-ui';

import { Component, View } from 'angular2/core';

import { bootstrap } from 'angular2/platform/browser';

//create a simple angular component
@Component({
  selector: 'main-app'
})
@View({
  template: '<h4>Hello {{name}}</h4>'
})
class Main {
  name: string;
  constructor(){
    this.name = "sample";
    setTimeout(() => {
      this.name = 'Angular2!!!'
    },1500);
  }
}

//start our app
bootstrap(Main);
