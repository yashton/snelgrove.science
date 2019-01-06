import React, { Component } from 'react';
import { EntryComp } from './EntryComp';
import moment from 'moment';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Menu,
  Pagination,
  Highlight,
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
        <div style={{display: "flex"}}>
          <nav>
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
          </nav>
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
