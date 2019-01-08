import React, { Fragment } from 'react';
import { default as BaseEntry } from './Entry';
import styled from 'styled-components';

const Entry = styled(BaseEntry)`
  width: 40em;
`;

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 8}
    this.scrollHandler = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
      ) {
        this.setState(s => ({ count: Math.min(s.count + 8, this.props.entries.length)}));
      }
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler, {passive: true});
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    const {filter, entries} = this.props;
    const { count } = this.state;
    const sort = (a, b) => -a.posted.localeCompare(b.posted);
    return (
      <Fragment>
        {[...entries].filter(filter).sort(sort).slice(0, count).map(e => <Entry key={e.objectID} entry={e}/>)}
      </Fragment>
    );
  }
};

export default Entries;
