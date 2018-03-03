import React from 'react';

import Logout from './Logout';
import AddItem from './AddItem';
import BudgetList from './BudgetList';
import SetBalance from './SetBalance';

export default () => {
  return (
    <div>
      <Logout title="BudgetBuddy"/>
      <div className="page-content">
        <SetBalance/>
        <AddItem/>
        <BudgetList/>
      </div>
    </div>
  );
};
