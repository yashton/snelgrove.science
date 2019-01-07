import React, { Fragment } from 'react';
import EntryList from './EntryList';
import Search from './Search';

import { Switch, Route } from "react-router";
const Blog = (props) => (
  <Fragment>
    <Switch>
      <Route path="/search" component={Search}/>
      <Route component={EntryList}/>
    </Switch>
  </Fragment>);

export default Blog
