import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.publish('users', function () {
    return Meteor.users.find({ userId: this.userId });
  });
}

// Validation for new user email only, password validation in Signup.js
Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  // Setting a schema to validate against and testing the email structure against it
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });

  return true;
});

Meteor.methods({
  'startingBalance.update'(startingBalance) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update({_id: this.userId}, {$set: {profile: { startingBalance }}});
  }})
