'use strict';

import {getMode} from './modules/mode';
import welcome from './modules/welcome';

welcome('admin page');

// используем переменную ENV из Webpack!
// noinspection JSUnresolvedVariable
alert('!!!!!!!!!!!' + ENV + '!!!!!!!!!!!');
// noinspection JSUnresolvedVariable
getMode(ENV === 'development');

//
// exports.getMode = getMode;

