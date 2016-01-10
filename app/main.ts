//import deps
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
import 'es6-shim';

import { Component, View } from 'angular2/core';

import { bootstrap } from 'angular2/platform/browser';

//create a simple angular component
@Component({
  selector: 'test-app'
})
@View({
  template: '<h4>Hello {{name}}</h4>'
})
class TestApp {
  name: string;
  constructor(){
    this.name = "sample";
    setTimeout(() => {
      this.name = 'Angular2!!!'
    },1500);
  }
}

//start our app
bootstrap(TestApp);
