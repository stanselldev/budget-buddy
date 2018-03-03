import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export default class SetBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingBalance: ''
    }
  }

  onSubmit(event) {
    const startingBalance = event.target.startingBalance.value;
    event.persist();
    event.preventDefault();

    if (startingBalance) {
      Meteor.call('startingBalance.update', startingBalance, (err, res) => {
        if (!err) {
          event.target.startingBalance.value = '';
        } else {
          console.log(err);
        }
      });
    }
  }

  componentDidMount() {
    this.balanceTracker = Tracker.autorun(() => {
      Meteor.subscribe('users');
      var user = Meteor.users.find({}).fetch();

      try {
        this.setState({ startingBalance: user[0].profile.startingBalance });
      }
      catch (err) {
        // console.log(err);
      }
    });
  }

  componentWillUnmount() {
    this.balanceTracker.stop();
  }

  render() {
    return (
      <div className="balance">
        <div className="balance__item">
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="number"
              name="startingBalance"
              placeholder="Starting Balance"/>
            <button className="button--pill">Set Balance</button>
          </form>
        </div>
        <div className="balance__item">
          <div>
            <h1>Starting Balance:&nbsp; </h1>
          </div>
            <h1>
              <NumberFormat
              value={this.state.startingBalance}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={value => <div>{value}</div>}/>
            </h1>
        </div>
      </div>
    );
  }
}
