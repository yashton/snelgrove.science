import React, { Fragment } from 'react';
import axios from 'axios';
import Entry from './Entry';
import Navigation from './Navigation';
import styled from 'styled-components';
import { compose } from 'recompose';
import { Route, Switch } from 'react-router-dom';

const incrementLoading = (s) => ({ ...s, loading: s.loading + 1 });
const decrementLoading = (s) => ({ ...s, loading: s.loading - 1 });

const Contents = styled.div`
  display: flex;
  margin: 1em;
`;

class EntryList extends React.Component {
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
      const { data } = await axios.get('/entries.json',
                                       { cancelToken: this.cancel.token });
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
    const sorted = [...entries].sort((a, b) => -a.posted.localeCompare(b.posted));
    if (loading) return null;
    return (
      <Contents>
        <Navigation entries={entries}/>
        <main>
          <Switch>
            <Route
              path="/entries/:entry"
              render={p =>
                (<SingleEntry entry={p.match.params.entry} entries={entries}/>)}/>
            <Route
              render={p =>
                (<MultipleEntry entries={sorted}/>)}/>
          </Switch>
        </main>
      </Contents>
    );
  }
}

const SingleEntry = (props) => {
  const found = props.entries.find(e => props.entry === e.objectID);
  if (!found) return (<span>Whoops missing {props.entry}</span>);
  return (<Entry entry={found}/>);
};

const MultipleEntry = (props) => (
  <Fragment>
    {props.entries.map(e => <Entry key={e.objectID} entry={e}/>)}
  </Fragment>
);

export default EntryList;
