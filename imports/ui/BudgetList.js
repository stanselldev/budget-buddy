import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Finances } from '../api/finances';
import BudgetItem from './BudgetItem';

export default class BudgetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finances: [],
      startingBalance: '',
      calculated: false
    };
  }

  sortFinances(a, b) {
    return a.day - b.day;
  }

  componentDidMount() {
    this.financesTracker = Tracker.autorun(() => {
      Meteor.subscribe('finances');
      Meteor.subscribe('users');
      const finances = Finances.find({}).fetch();
      const user = Meteor.users.find({}).fetch();

      try {
        startingBalance = user[0].profile.startingBalance;
        this.setState({ startingBalance: user[0].profile.startingBalance });
      }
      catch (err) {}

      finances.sort(this.sortFinances);

      this.setState({ finances });
      try {
        for (i = 0; i < this.state.finances.length; i++) {
          if (i === 0) {
            this.state.finances[i].endingBalance = this.state.startingBalance - this.state.finances[i].amount;
          } else {
            this.state.finances[i].endingBalance = this.state.finances[i - 1].endingBalance - this.state.finances[i].amount;
          }
        }
        if (this.state.finances[0].endingBalance) {
          this.setState({ calculated: true });
        }
      }
      catch (err) {}
    });
  }

  componentWillUnmount() {
    this.financesTracker.stop();
  }

  renderBudgetListItems() {
    return this.state.finances.map((finance) => {
      return <BudgetItem key={finance._id} {...finance}/>;
    });
  }

  render() {
    return (
      <div>
        <div className="item item__body">
          <div className="item__inner">Day</div>
          <div className="item__inner">Name</div>
          <div className="item__inner">Amount</div>
          <div className="item__inner">Ending Balance</div>
          <button className="button--blank">Action</button>
        </div>
        <div>
          {this.state.calculated ? <div>{this.renderBudgetListItems()}</div> : undefined}
        </div>
      </div>
    )
  }
};
