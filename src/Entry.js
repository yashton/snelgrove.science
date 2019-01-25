import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tag from './Tag';
import * as colors from './colors';

const Card = styled.div`
  width: 100%;
  margin: 1.5em 0em;
  border-radius: 6px;
  margin: 1.5em;
  background-color: ${colors.primary1};
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Contents = styled.div`
  padding: 1.5rem 2.5rem 2.5rem 2.5rem;
`;

const EntryHeader = styled.h2`
  margin: 0em;
  background-color: ${colors.secondary3};
  color: ${colors.secondary1};
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;
  border-radius: 6px 6px 0px 0px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const Photo = styled.img`
  max-height: 12em;
`;

const Photoset = styled.div`
  display: flex;
  flex-wrap wrap;
`;

const TagSet = styled.ul`
  list-style-type: none;
  margin: 0.5em 0em;
  padding: 0;
`;

const PostedStyle = styled.time`
  margin: 0.5em 0em;
  display: block;
  font-style: italic;
`;

const Body = styled.div`
`;

const Posted = ({datetime}) =>
      (<PostedStyle dateTime={datetime}>{moment(datetime).format("LLL")}</PostedStyle>);

const Entry = ({entry, className}) => (
  <Card as="article" className={className}>
    <EntryHeader>
      <Link to={`/entries/${entry.objectID}`}>
        {entry.title || "MISSING"}
      </Link>
    </EntryHeader>

    <Contents>
      <Posted datetime={entry.posted} />
      <Body>
        <div dangerouslySetInnerHTML={{__html: entry.body}}/>
      </Body>
      <Photoset>
        {entry.photos && entry.photos.map(({caption, url}) => (
          <Photo key={url} alt={caption} src={url}/>
        ))}
      </Photoset>
      <TagSet>
        {entry.tags && entry.tags.map(
          tag => (<Tag as="li" key={tag}>{tag}</Tag>))}
      </TagSet>
  </Contents>
  </Card>
);

export default Entry;
