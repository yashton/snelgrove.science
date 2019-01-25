import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Navigation from './Navigation';
import styled from 'styled-components';
import { compose } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import Entries from './Entries';
import dataUrl from '../entries-generator';
import BaseLogo from './logo/logomin.svg';
import * as colors from './colors';

const Logo = styled(BaseLogo)`
  @keyframes fade {
    from {
      opacity: 0.0;
    }
    to {
      opacity: 1.0;
    }
  }

  path {
    animation: 1s infinite alternate fade;
    fill: ${colors.primary0};
    fill-rule:evenodd;
  }
  height: 50vh;
  margin: auto;
`;

const incrementLoading = (s) => ({ ...s, loading: s.loading + 1 });
const decrementLoading = (s) => ({ ...s, loading: s.loading - 1 });

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1em;
`;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.cancel = axios.CancelToken.source();
    this.state = {
      loading: 0,
      entries: [],
    };
  }

  async componentDidMount() {
    try {
      this.setState(incrementLoading);
      const { data } = await axios.get(dataUrl, { cancelToken: this.cancel.token });
      const update = (s) => ({ ...s, entries: data });
      this.setState(compose(decrementLoading, update));
    } catch (e) {
      if (!axios.isCancel(e)) console.error(e);
      this.setState(decrementLoading);
    }
  }

  componentWillUnmount() {
    this.cancel.cancel();
  }

  render() {
    const {loading, entries} = this.state;
    if (loading > 0) {
      return <Contents><Logo/><h1>Loading...</h1></Contents>;
    }
    return (
      <Contents>
        <Navigation entries={entries} />
          <Switch>
            <Route
              path="/entries/:entry"
              render={({match: { params: { entry }}}) =>
                      (<Entries entries={entries} filter={single(entry)}/>)}/>
            <Route
              path="/entries"
              render={({location: { search }}) =>
                      (<Entries entries={entries} filter={parse(search)}/>)}/>
            <Route
              render={({location: { search }}) =>
                      (<Entries entries={entries} filter={()=>true}/>)}/>
          </Switch>
      </Contents>
    );
  }
}

const parse = search => {
  const params = new URLSearchParams(search);
  console.log("search", params.toString());
  let filters = [];
  if (params.has("tag")) {
    console.log(params.getAll("tag"));
    params.getAll("tag").forEach(t => filters.push(e => e.tags.some(u => u === t)));
  }
  if (params.has("year"))
    filters.push(e => moment(e.posted).year() === parseInt(params.get("year")));
  if (params.has("month"))
    filters.push(e => moment(e.posted).month() === parseInt(params.get("month")));
  console.log(filters);
  return filters.reduce((a, c) => e => a(e) && c(e), () => true);
};

const single = id => entry => id === entry.objectID;

export default Blog;
