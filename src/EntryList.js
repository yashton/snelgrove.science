import React from 'react';
import axios from 'axios';
import Entry from './Entry';

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
      const { data } = await axios.get('/entries/index.json',
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
    if (loading) return null;
    return (
      <main>
        {entries.map(e => <Entry key={e} entry={e}/>)}
      </main>
    );
  }
}

export default EntryList;
