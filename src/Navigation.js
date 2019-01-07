import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { ReactComponent as Logo } from './logo.svg';

export const Nav = styled.nav`
  height: 100%;
  border: 1px solid #00000070;
  border-radius: 4px;
  padding: 1em;
  margin-right: 1em;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  h1 {
    white-space: nowrap;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .logo path {
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

const collectPosted = (es) => {
  let months = new Set();
  es.forEach(e => months.add(moment(e.posted).format("MMMM YYYY")));
  return Array.from(months);
}

const collectTags = (es) => {
  let tags = new Set();
  es.forEach(e =>
             e.tags && e.tags.forEach(t => tags.add(t)));
  return Array.from(tags);
}

const Navigation = ({entries}) => (
  <Nav>
    <Logo />
    <h1 style={{whiteSpace:"no-wrap"}} >Ashton's Projects</h1>
    <hr/>
    <h2>Tags</h2>
    <ul>
      {collectTags(entries).map(t => <li key={t}>{t}</li>)}
    </ul>
    <hr/>
    <h2>Posted</h2>
    <ul>
      {collectPosted(entries).map(t => <li key={t}>{t}</li>)}
    </ul>
  </Nav>
);

export default Navigation;
