import React, { Component } from 'react';
import { EntryComp } from './Entry';
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

class Search extends Component {
  render() {
    return (
      <div>
        <h1>Post search</h1>
        <InstantSearch
          appId="FBUJNN23U4"
          apiKey="36aafccbdf557d9165097ac728ecedc4"
          indexName="ashton.snelgrove.science"
        >
          <div style={{border:"1px solid green"}}>
            <ClearRefinements />
            <h2>Tags</h2>
            <Menu attribute="tags" />
            <h2>Posted</h2>
            <Menu attribute="posted_month"
                  transformItems={
                    items => (items.map(
                      item => ({
                        ...item,
                        label: moment(item.label).format("MMMM YYYY")
                      })))} />
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

const Hit = (props) => (
  <div>
    <EntryComp entry={props.hit}/>
    <div className="hit-name">
      <Highlight attribute="title" hit={props.hit} />
    </div>
    <div className="hit-description">
      <Highlight attribute="description" hit={props.hit} />
    </div>
  </div>
);

export default Search;
