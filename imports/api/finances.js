import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Finances = new Mongo.Collection('finances');

// Checks if running on server then publishes 'links' and finds links for specific users
if (Meteor.isServer) {
  Meteor.publish('finances', function () {
    return Finances.find({ userId: this.userId });
  });
}

Meteor.methods({
  'finances.insert'(finance) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // new SimpleSchema({
    //   finance: {
    //     day: {
    //       type: Number
    //     },
    //     name: {
    //       type: String
    //     },
    //     amount: {
    //       type: Number
    //     }
    //   }
    // }).validate({ finance });

    Finances.insert({
      _id: shortid.generate(),
      day: finance.day,
      name: finance.name,
      amount: finance.amount,
      userId: this.userId
    });
  },
  'finances.delete'(financeId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Finances.remove({ _id: financeId});
  }
});
