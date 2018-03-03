import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Budget from '../ui/Budget';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/budget'];

// Send user to /links when the user is already logged in
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/budget');
  }
};

// If customer is not logged in, push them to login page
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

// Code to run when authentication status changes
export const onAuthChange = (isAuthenticated) => {
  // Getting the current path
  const pathName = browserHistory.getCurrentLocation().pathname;
  // Setting booleans for whether pages exist in the arrays above
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  // Conditional statements to determine where the user should be
  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/budget');
  }
  if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace('/');
  }
};

// Setting up the React routes for page navigation
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/budget" component={Budget} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage} />
  </Router>
);
