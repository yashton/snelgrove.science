import React, { Fragment } from 'react';
import axios from 'axios';
import { EntryComp } from './EntryComp';
import Navigation from './Navigation';
import styled from 'styled-components';

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
      this.setState((s) => ({ ...s, loading: s.loading + 1 }));
      const { data } = await axios.get('/entries.json',
                                       { cancelToken: this.cancel.token });
      this.setState((s) => ({ ...s, loading: s.loading - 1, entries: data }));
    } catch (e) {
      if (!axios.isCancel(e)) console.error(e);
      this.setState((s) => ({ ...s, loading: s.loading - 1 }));
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
      <Fragment>
      <Contents>
        <Navigation entries={entries}/>
        <main>
          {sorted.map(e => <EntryComp key={e.objectID} entry={e}/>)}
        </main>
      </Contents>
      </Fragment>
    );
  }
}

export default EntryList;
