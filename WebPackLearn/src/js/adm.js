'use strict';

import {getMode} from './modules/mode';
import welcome from './modules/welcome';

welcome('admin page');

// noinspection JSUnresolvedVariable
alert('!!!!!!!!!!!' + ENV + '!!!!!!!!!!!');
// noinspection JSUnresolvedVariable
getMode(ENV === 'development');
