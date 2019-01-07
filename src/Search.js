import React, { Component } from 'react';
import Entry from './Entry';
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

const monthLabels = items => (
  items.map(item => ({
    ...item,
    label: moment(item.label).format("MMMM YYYY")
  })));

const SearchContainer = styled.div`
.ais-Hits-list, .ais-Menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.ais-Menu-item {
    margin: 0.5em 0;
}

.ais-Menu-link {
    text-decoration: none;
    color: inherit;
}

.ais-Menu-count {
    font-size: small;
    border-radius: 4px;
    background-color: #cc97f6;
    color: white;
    padding: 0.2em 0.4em;
    margin-left: 0.2em;
}
`;

class Search extends Component {
  render() {
    return (
      <SearchContainer>
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
      </SearchContainer>
    );
  }
}

const Hit = (props) => (
  <Entry entry={props.hit}/>
);

export default Search;
