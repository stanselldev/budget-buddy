import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import BudgetList from './BudgetList';

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finance: {
        day: '',
        name: '',
        amount:''
      }
    };
  }

  onSubmit(event) {
    const finance = this.state.finance;
    event.preventDefault();
    if (finance) {
      Meteor.call('finances.insert', finance, (err, res) => {
        if (!err) {
          this.setState({ finance: {
            day: '',
            name: '',
            amount: ''
          }});
        } else {
          console.log(err);
        }
      });
    }
  }

  onChange(propertyName, event) {
    const finance = this.state.finance;
    finance[propertyName] = event.target.value;
    this.setState({ finance });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="number"
              placeholder="Day of Month"
              value={this.state.finance.day}
              onChange={this.onChange.bind(this, 'day')}/>
            <input
              type="text"
              placeholder="Name"
              value={this.state.finance.name}
              onChange={this.onChange.bind(this, 'name')}/>
            <input
              type="number"
              placeholder="Amount"
              value={this.state.finance.amount}
              onChange={this.onChange.bind(this, 'amount')}/>
            <button className="button--pill">Add Finance</button>
          </form>
        </div>
        <hr/><br/>
      </div>
    );
  }
}

AddItem.propTypes = {
  title: PropTypes.string
};
