import React, { Component } from 'react';
import { EntryComp } from './EntryComp';
import moment from 'moment';
import styled from 'styled-components';
import { Nav } from './Navigation';
import { ReactComponent as Logo } from './logo.svg';

import {
  InstantSearch,
  Hits,
  SearchBox,
  Menu,
  Pagination,
  ClearRefinements,
  Configure,
} from 'react-instantsearch-dom';
import './instantsearch.css';

const monthLabels = items => (
  items.map(item => ({
    ...item,
    label: moment(item.label).format("MMMM YYYY")
  })));

class Search extends Component {
  render() {
    return (
      <InstantSearch
        appId="FBUJNN23U4"
        apiKey="36aafccbdf557d9165097ac728ecedc4"
        indexName="ashton.snelgrove.science">
        <div style={{display:"flex"}}>
          <Nav>
            <Logo />
            <h1 style={{whiteSpace:"no-wrap"}} >Ashton's Projects</h1>
            <SearchBox />
            <ClearRefinements />
            <div>
              <h2>Tags</h2>
              <Menu attribute="tags" />
            </div>
            <div>
              <h2>Posted</h2>
              <Menu attribute="posted_month" transformItems={monthLabels}/>
            </div>
            <Configure hitsPerPage={8} />
          </Nav>
          <main>
            <Hits hitComponent={Hit} />
            <Pagination />
          </main>
        </div>
      </InstantSearch>
    );
  }
}

const Hit = (props) => (
  <EntryComp entry={props.hit}/>
);

export default Search;
