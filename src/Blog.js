import React, { Fragment } from 'react';
import Navigation from './Navigation';
import EntryList from './EntryList';
import Entry from './Entry';
import Search from './Search';

import { Switch, Route } from "react-router";
const Blog = (props) => (
  <Fragment>
    <Switch>
      <Route path="/entries/:entry"
             render={p => (<Entry entry={p.match.params.entry}/>)}/>
      <Route path="/search" component={Search}/>
      <Route component={EntryList}/>
    </Switch>
    <Navigation/>
  </Fragment>);

export default Blog
