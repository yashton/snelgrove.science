import React from 'react';
import axios from 'axios';
import { compose } from 'recompose';
import moment from 'moment';
import { Link} from 'react-router-dom';

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
export const EntryComp = ({entry}) => (
  <article style={{border:'1px solid blue'}}>
    <h1><Link to={`/entries/${entry.objectID}`}>{entry.title || "MISSING"}</Link></h1>
    <p dangerouslySetInnerHTML={{__html: entry.body}}/>
    {entry.photos && entry.photos.map(({caption, url}) => (
      <img key={url} alt={caption} src={url} width="100%" height="100%"/>
    ))}
    <ul>{entry.tags && entry.tags.map(tag => (<li key={tag}>{tag}</li>))}</ul>
    <time dateTime={entry.posted}>{moment(entry.posted).format("LLL")}</time>
  </article>
);
export default Entry;
