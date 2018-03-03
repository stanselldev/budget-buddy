import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

export default class BudgetItem extends React.Component {
  deleteFinance(financeId) {
    Meteor.call('finances.delete', financeId, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="item__body">
        <div className="item__inner">{this.props.day}</div>
        <div className="item__inner">{this.props.name}</div>
        <div className="item__inner"><NumberFormat value={this.props.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>}/></div>
        <div className="item__inner"><NumberFormat value={this.props.endingBalance} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>}/></div>
        <button className="button" onClick={this.deleteFinance.bind(this, this.props._id)}>DELETE</button>
      </div>
    );
  }
};

BudgetItem.propTypes = {
  day: PropTypes.string,
  name: PropTypes.string,
  amount: PropTypes.string
}
