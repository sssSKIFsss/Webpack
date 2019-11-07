'use strict';

// import AppService from "./modules/app.service";
// const service = new AppService('Hello AppService');
// service.log();

// import {config} from './modules/config'; - extract config
// console.log('Config key:', config.key);

// React example
// import React from 'react'
// Bootstrap example
//import Bootstrap from 'bootstrap/dist/js/bootstrap.min/js'
//import 'bootstrap/dist/js/bootstrap.min/js'

import './styles/css/index.css';
import './styles/scss/index.scss';
import './js';

import welcome from './js/modules/welcome';

welcome('index page');
console.log("index page worked!");

exports.welcome = welcome;

// библиотека подключается благодаря вызову ёё символов в коде и
// объявлении в разделе plugins через webpack.ProvidePlugin
console.log($);
console.log(jQuery);
