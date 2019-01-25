import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import BaseLogo from './logo/logomin.svg';
import { Link as BaseLink } from 'react-router-dom';
import * as colors from './colors';

const Count = styled.span`
  color: ${colors.primary4};
  background-color: ${colors.primary2};
  display: inline;
  border-radius: 4px;
  padding: 0.1em 0.4em;
  text-align: center;
  font-size: smaller;
  font-family: 'Exo 2';
  margin-left: 0.6em;
`;

const Nav = styled.nav`
  border-radius: 6px;
  margin: 1.5em;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  height: 100%;
  background-color: ${colors.primary1};
  color: ${colors.primary4};
`;

const Top = styled.div`
  border-radius: 6px 6px 0px 0px;
  padding: 1em;
  background-color: ${colors.primary0};
  color: ${colors.primary1};
`;

const Links = styled.div`
  padding: 1em;
`;

const Link = styled(BaseLink)`
  color: inherit;
  text-decoration: none;
`;

const ExternalLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Header = styled.h1`
  white-space: nowrap;
  text-transform: uppercase;
`;

const SearchList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchItem = styled.li`
  margin: 0.6em 0;
`;

const Logo = styled(BaseLogo)`
  path {
    opacity:1;
    fill: ${colors.primary1};
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
  <Nav className={className}>
    <Top>
      <Logo />
      <Header><Link to="/entries">Ashton's Projects</Link></Header>
    </Top>
    <Links>
      <h2>Tags</h2>
      <SearchList>
        {tags(entries)}
      </SearchList>
      <hr/>
      <h2>Posted</h2>
      <SearchList>
        {posted(entries)}
      </SearchList>
      <hr/>
      <SearchList>
        <SearchItem>
          <ExternalLink href="https://www.linkedin.com/in/ashtonsnelgrove/">LinkedIn</ExternalLink>
        </SearchItem>
        <SearchItem>
          <ExternalLink href="https://www.snelgrove.family/">Snelgrove Family Blogs</ExternalLink>
        </SearchItem>
      </SearchList>
    </Links>
  </Nav>
);

export default Navigation;
