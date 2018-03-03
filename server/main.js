import 'babel-polyfill';
import { Meteor } from 'meteor/meteor';

import '../imports/api/users';
import '../imports/api/finances';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

});
