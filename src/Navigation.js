import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { ReactComponent as BaseLogo } from './logo.svg';
import { Link as BaseLink } from 'react-router-dom';
import Card from './Card';
import Tag from './Tag';

const Count = styled(Tag)`
  margin-left: 0.5em;
`;

const Nav = styled(Card)`
  height: 100%;
  padding: 1em;
`;

const Link = styled(BaseLink)`
  color: inherit;
  text-decoration: none;
`;

const Header = styled.h1`
  white-space: nowrap;
`;

const SearchList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchItem = styled.li`
  margin: 0.5em 0;
`;

const Logo = styled(BaseLogo)`
  path {
    opacity:1;
    fill:#65C4FF;
    fill-opacity:1;
    fill-rule:evenodd;
    stroke:none;
    stroke-width:1px;
    stroke-linecap:butt;
    stroke-linejoin:miter;
    stroke-opacity:1;
  }
`;

const posted = (es) => {
  let months = {};

  es.forEach(e => {
    const time = moment(e.posted);
    const label = time.format("MMMM YYYY");
    const count = months[label] ? months[label].count + 1 : 1;
    months[label] = { count, month: time.month(), year: time.year() };
  });
  return Object.entries(months).map(
    ([label, m]) =>
      (<SearchLink key={label}
                   to={`/entries?month=${m.month}&year=${m.year}`}
                   label={label}
                   count={m.count} />));
}

const tags = (es) => {
  let tags = {};
  es.forEach(e => e.tags && e.tags.forEach(t => tags[t] = (tags[t] || 0) + 1));

  return Object.entries(tags).map(
    ([tag, count]) =>
      (<SearchLink key={tag}
                   to={`/entries?tag=${tag}`}
                   label={tag}
                   count={count}/>));
};

const SearchLink = ({to, label, count}) => (
  <SearchItem>
    <Link to={to}>{label}</Link>
    <Count>{count}</Count>
  </SearchItem>);

const Navigation = ({entries, className}) => (
  <Nav as="nav" className={className}>
    <Logo />
    <Header><Link to="/entries">Ashton's Projects</Link></Header>
    <hr/>
    <h2>Tags</h2>
    <SearchList>
      {tags(entries)}
    </SearchList>
    <hr/>
    <h2>Posted</h2>
    <SearchList>
      {posted(entries)}
    </SearchList>
  </Nav>
);

export default Navigation;
