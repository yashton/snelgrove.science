import React from 'react';
import Entry from './Entry';
import styled from 'styled-components';

const EntryContainer = styled.div`
  max-width: 40em;
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
      <main>
        {[...entries].filter(filter).sort(sort).slice(0, count).map(
          e => <EntryContainer key={e.objectID}><Entry entry={e}/></EntryContainer>)}
      </main>
    );
  }
};

export default Entries;
