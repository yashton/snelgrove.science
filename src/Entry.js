import React from 'react';
import axios from 'axios';
import { compose } from 'recompose';
import { EntryComp } from './EntryComp';

const incrementLoading = (s) => ({ ...s, loading: s.loading + 1 });
const decrementLoading = (s) => ({ ...s, loading: s.loading - 1 });

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.cancel = axios.CancelToken.source();
    this.state = {
      loading: 0,
      entry: {},
    };
  }

  async componentDidMount() {
    try {
      const { entry } = this.props;
      this.setState(incrementLoading);
      const { data } = await axios.get(`/entries/${entry}/${entry}.blog`,
                                       { cancelToken: this.cancel.token });
      const update = (s) => ({ ...s, entry: data });
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
    const {loading, entry} = this.state;
    if (loading) return <article>Loading...</article>;
    return (
      <EntryComp entry={entry}/>
    );
  }
}
export default Entry;
