import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// Below call lets us change the error message thrown by SimpleSchema
SimpleSchema.defineValidationErrorTransform((error) => {
  return new Meteor.Error(400, error.message);
});
